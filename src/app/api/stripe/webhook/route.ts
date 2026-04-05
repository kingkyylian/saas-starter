import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { PLAN_LIMITS } from "@/types";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("[STRIPE_WEBHOOK] Signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        if (!userId) break;

        const subscriptionId = session.subscription as string;
        const sub = await stripe.subscriptions.retrieve(subscriptionId);

        await db.subscription.upsert({
          where: { userId },
          update: {
            stripeSubscriptionId: subscriptionId,
            stripePriceId: sub.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              sub.current_period_end * 1000,
            ),
            status: "active",
            plan: "pro",
          },
          create: {
            userId,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: sub.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              sub.current_period_end * 1000,
            ),
            status: "active",
            plan: "pro",
          },
        });

        await db.user.update({
          where: { id: userId },
          data: {
            creditsUsed: 0,
            creditsLimit: PLAN_LIMITS.pro.creditsPerMonth,
          },
        });
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const subscription = await db.subscription.findUnique({
          where: { stripeSubscriptionId: sub.id },
        });
        if (!subscription) break;

        const isActive =
          sub.status === "active" || sub.status === "trialing";

        await db.subscription.update({
          where: { stripeSubscriptionId: sub.id },
          data: {
            stripePriceId: sub.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              sub.current_period_end * 1000,
            ),
            status: isActive ? "active" : sub.status,
            plan: isActive ? "pro" : "free",
          },
        });

        if (isActive) {
          await db.user.update({
            where: { id: subscription.userId },
            data: { creditsLimit: PLAN_LIMITS.pro.creditsPerMonth },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const subscription = await db.subscription.findUnique({
          where: { stripeSubscriptionId: sub.id },
        });
        if (!subscription) break;

        await db.subscription.update({
          where: { stripeSubscriptionId: sub.id },
          data: {
            status: "canceled",
            plan: "free",
          },
        });

        await db.user.update({
          where: { id: subscription.userId },
          data: {
            creditsUsed: 0,
            creditsLimit: PLAN_LIMITS.free.creditsPerMonth,
          },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[STRIPE_WEBHOOK] Handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
