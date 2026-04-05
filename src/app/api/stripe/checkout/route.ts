import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createCheckoutSession, createCustomer } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId } = (await req.json()) as { priceId: string };
    if (!priceId) {
      return NextResponse.json(
        { error: "priceId zorunlu" },
        { status: 400 },
      );
    }

    let subscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
    });

    if (!subscription) {
      const customer = await createCustomer(
        session.user.email!,
        session.user.name ?? undefined,
      );

      subscription = await db.subscription.create({
        data: {
          userId: session.user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const checkoutSession = await createCheckoutSession(
      subscription.stripeCustomerId,
      priceId,
      session.user.id,
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error);
    return NextResponse.json(
      { error: "Checkout olusturulamadi" },
      { status: 500 },
    );
  }
}
