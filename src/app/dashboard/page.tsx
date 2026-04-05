import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [user, recentContents] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      include: { subscription: true },
    }),
    db.content.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { outputs: { select: { platform: true } } },
    }),
  ]);

  if (!user) redirect("/login");

  const plan = user.subscription?.status === "active" ? user.subscription.plan : "free";
  const creditsRemaining = user.creditsLimit - user.creditsUsed;

  const history = recentContents.map((c) => ({
    id: c.id,
    date: c.createdAt.toISOString().split("T")[0],
    inputPreview: c.body.slice(0, 80) + (c.body.length > 80 ? "..." : ""),
    targets: [...new Set(c.outputs.map((o) => o.platform))],
  }));

  return (
    <DashboardClient
      userName={user.name ?? "there"}
      plan={plan ?? "free"}
      creditsUsed={user.creditsUsed}
      creditsLimit={user.creditsLimit}
      creditsRemaining={creditsRemaining}
      totalActions={user.creditsUsed}
      history={history}
    />
  );
}
