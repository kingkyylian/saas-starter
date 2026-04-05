import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get("skip") ?? "0", 10);
    const take = Math.min(parseInt(searchParams.get("take") ?? "20", 10), 50);
    const platform = searchParams.get("platform");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const where: Record<string, unknown> = { userId: session.user.id };

    if (from || to) {
      where.createdAt = {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(to) } : {}),
      };
    }

    const outputFilter = platform
      ? { some: { platform } }
      : undefined;

    const [contents, total] = await Promise.all([
      db.content.findMany({
        where: {
          ...where,
          ...(outputFilter ? { outputs: outputFilter } : {}),
        },
        include: {
          outputs: platform
            ? { where: { platform } }
            : true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      db.content.count({
        where: {
          ...where,
          ...(outputFilter ? { outputs: outputFilter } : {}),
        },
      }),
    ]);

    return NextResponse.json({
      contents,
      total,
      skip,
      take,
      hasMore: skip + take < total,
    });
  } catch (error) {
    console.error("[HISTORY]", error);
    return NextResponse.json(
      { error: "Gecmis yuklenemedi" },
      { status: 500 },
    );
  }
}
