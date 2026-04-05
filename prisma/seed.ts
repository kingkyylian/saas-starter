import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding demo data...");

  // Demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo User",
      creditsUsed: 3,
      creditsLimit: 5,
    },
  });

  console.log(`Created user: ${user.email}`);

  // Demo content items with outputs
  const seeds = [
    {
      body: "Launched our new feature today after 3 months of work. The team stayed up until 2am to get it shipped. Sometimes the grind is worth it when you see users loving what you built. Building in public keeps us accountable.",
      type: "default",
      outputs: [
        {
          platform: "output_a",
          body: "We just shipped a feature 3 months in the making. Late nights, early mornings — and it was worth every second. Our users are loving it.\n\nBuilding in public keeps us honest. Here's what we learned along the way...",
        },
        {
          platform: "output_b",
          body: "After 3 months of focused development, we're thrilled to announce our latest feature release.\n\nThis milestone reflects our team's commitment to building tools that genuinely solve problems for our users. The road wasn't easy — late nights and early mornings were a regular occurrence — but the results speak for themselves.\n\nWe build in public because transparency drives better products. What are your thoughts on shipping vs. stealth mode?\n\n#ProductLaunch #Startup #BuildInPublic",
        },
      ],
    },
    {
      body: "10 lessons I learned from my first year running a SaaS: 1) Talk to users every day 2) Ship faster than you think is ready 3) Pricing is strategy, not math 4) Support tickets are your best roadmap 5) Churn tells you more than growth...",
      type: "summarize",
      outputs: [
        {
          platform: "output_a",
          body: "Year 1 SaaS lessons — the unfiltered version:\n\n1/ Talk to users every day. Not surveys. Actual conversations.\n\n2/ Ship faster than you think is ready. Done beats perfect.\n\n3/ Pricing is strategy, not math.\n\n4/ Your support queue IS your roadmap.\n\n5/ Churn tells you more than growth ever will.\n\nThe stuff they don't teach in startup school.",
        },
        {
          platform: "output_b",
          body: "One year into running a SaaS — here's what actually matters:\n\nThe technical challenges were the easy part. The hard lessons came from the business side.\n\nKey takeaway: talk to your users constantly. Not through surveys or analytics dashboards — through real conversations. That's where the gold is.\n\nWhat's the most valuable lesson from your first year?\n\n#SaaS #Startup #Entrepreneurship #BuildInPublic",
        },
      ],
    },
    {
      body: "We just crossed $10K MRR. 18 months ago I was working a 9-5 I hated. No funding, no fancy office, just a laptop and a credit card. The journey wasn't linear but every setback taught me something.",
      type: "transform",
      outputs: [
        {
          platform: "output_a",
          body: "18 months ago: 9-5 job I hated, laptop, one credit card.\n\nToday: $10K MRR.\n\nNo funding. No office. No shortcuts.\n\nThe setbacks hit harder than I expected. The wins felt better than I imagined.\n\nNonlinear is the only path.",
        },
        {
          platform: "output_b",
          body: "Milestone reached: $10K MRR.\n\nEighteen months ago I was working a job that was slowly draining my ambition. The leap felt terrifying. Starting with nothing but a laptop and determination, I bootstrapped every step of the way.\n\nThe path wasn't linear — it never is. But each setback revealed something I couldn't have learned any other way.\n\nIf you're earlier in the journey: keep going.\n\n#MRR #Bootstrap #Startup #IndieHacker",
        },
      ],
    },
  ];

  for (const seed of seeds) {
    const content = await prisma.content.create({
      data: {
        userId: user.id,
        body: seed.body,
        type: seed.type,
        outputs: {
          create: seed.outputs,
        },
      },
    });
    console.log(`Created content: ${content.id}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
