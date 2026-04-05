import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { PLAN_LIMITS } from "@/types";
import type { SubscriptionPlan } from "@/types";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const plan: SubscriptionPlan =
      user.subscription?.status === "active"
        ? (user.subscription.plan as SubscriptionPlan)
        : "free";

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      plan,
      credits: {
        used: user.creditsUsed,
        limit: user.creditsLimit,
        remaining: user.creditsLimit - user.creditsUsed,
      },
      settings: {
        brandVoice: user.brandVoice,
        defaultTone: user.defaultTone,
        defaultTargets: user.defaultTargets ? JSON.parse(user.defaultTargets) : [],
      },
      subscription: user.subscription
        ? {
            status: user.subscription.status,
            currentPeriodEnd: user.subscription.stripeCurrentPeriodEnd,
          }
        : null,
    });
  } catch (error) {
    console.error("[USER_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, brandVoice, defaultTone, defaultTargets } = body as {
      name?: string;
      brandVoice?: string;
      defaultTone?: string;
      defaultTargets?: string[];
    };

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (brandVoice !== undefined) data.brandVoice = brandVoice;
    if (defaultTone !== undefined) data.defaultTone = defaultTone;
    if (defaultTargets !== undefined) data.defaultTargets = JSON.stringify(defaultTargets);

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Guncellenecek alan belirtilmedi" },
        { status: 400 },
      );
    }

    const user = await db.user.update({
      where: { id: session.user.id },
      data,
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("[USER_PATCH]", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}
