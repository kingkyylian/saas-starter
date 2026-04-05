import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { processMultipleTargets } from "@/lib/actions";
import { PLAN_LIMITS } from "@/types";
import type { ActionType, Target, SubscriptionPlan } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { content, actionType, targets } = body as {
      content: string;
      actionType: ActionType;
      targets: Target[];
    };

    if (!content || !actionType || !targets?.length) {
      return NextResponse.json(
        { error: "content, actionType and targets are required" },
        { status: 400 },
      );
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
    const limits = PLAN_LIMITS[plan];

    const remaining = user.creditsLimit - user.creditsUsed;
    if (remaining <= 0) {
      return NextResponse.json(
        { error: "Credit limit reached. Upgrade to Pro for more.", code: "CREDITS_EXHAUSTED" },
        { status: 403 },
      );
    }

    const invalidTargets = targets.filter((t) => !limits.targets.includes(t));
    if (invalidTargets.length > 0) {
      return NextResponse.json(
        { error: `Targets not available on your plan: ${invalidTargets.join(", ")}`, code: "TARGET_LIMIT" },
        { status: 403 },
      );
    }

    if (content.length > limits.maxInputLength) {
      return NextResponse.json(
        { error: `Input too long. Maximum ${limits.maxInputLength} characters.`, code: "INPUT_TOO_LONG" },
        { status: 400 },
      );
    }

    const outputs = await processMultipleTargets(content, actionType, targets);

    const savedContent = await db.content.create({
      data: {
        userId: user.id,
        body: content,
        type: actionType,
        outputs: {
          create: outputs.map((output) => ({
            platform: output.target,
            body: output.body,
            metadata: output.metadata ? JSON.stringify(output.metadata) : null,
          })),
        },
      },
      include: { outputs: true },
    });

    await db.user.update({
      where: { id: user.id },
      data: { creditsUsed: { increment: 1 } },
    });

    return NextResponse.json({ contentId: savedContent.id, outputs });
  } catch (error) {
    console.error("[ACTION]", error);
    return NextResponse.json(
      { error: "Action failed. Please try again." },
      { status: 500 },
    );
  }
}
