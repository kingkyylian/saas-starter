# Next.js SaaS Starter

A production-ready SaaS boilerplate built with Next.js 15, Tailwind CSS v4, NextAuth v5, Stripe, and Prisma. Ship your SaaS in hours, not weeks.

## What's Included

- **Auth** — Google & GitHub OAuth via NextAuth v5 + Prisma adapter
- **Payments** — Stripe checkout, customer portal, and webhook handling
- **Database** — Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Dashboard** — Action history, settings, and credit tracking UI
- **AI stub** — Drop-in integration point for OpenAI, Anthropic, or any API
- **Subscription tiers** — Free (5 credits/mo) and Pro (100 credits/mo)
- **UI** — Dark mode, Framer Motion animations, Tailwind v4

---

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo>
cd saas-starter
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in `.env`:

| Variable | Where to get it |
|----------|----------------|
| `DATABASE_URL` | `file:./dev.db` for local SQLite |
| `AUTH_SECRET` | Run `openssl rand -base64 32` |
| `AUTH_URL` | `http://localhost:3000` locally |
| `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` | [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials |
| `AUTH_GITHUB_ID` + `AUTH_GITHUB_SECRET` | github.com → Settings → Developer settings → OAuth Apps |
| `STRIPE_SECRET_KEY` | [dashboard.stripe.com](https://dashboard.stripe.com) → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | See step 5 below |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard → Publishable key |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Stripe dashboard → Products → create a recurring price |
| `STRIPE_PRO_YEARLY_PRICE_ID` | Same product, yearly price |

**App identity** (shown in UI and page titles):
```env
NEXT_PUBLIC_APP_NAME="Your App Name"
NEXT_PUBLIC_APP_DESCRIPTION="Your tagline here."
```

### 3. Set up the database

```bash
npm run db:push      # Create tables
npm run db:seed      # Load demo data (optional)
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Set up Stripe webhooks (local)

```bash
npm run stripe:listen
```

This starts the Stripe CLI and forwards webhooks to `/api/stripe/webhook`. Copy the webhook signing secret it prints and paste it into `STRIPE_WEBHOOK_SECRET`.

---

## Customizing the AI Logic

The core processing logic lives in `src/lib/actions.ts`. It ships as a stub — replace it with your own:

```ts
// src/lib/actions.ts

import OpenAI from "openai";
import type { ActionType, Target, GeneratedOutput } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function processAction(
  input: string,
  actionType: ActionType,
  target: Target,
): Promise<GeneratedOutput> {
  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: `You are a ${actionType} assistant. Output for: ${target}` },
      { role: "user", content: input },
    ],
  });
  return {
    target,
    body: res.choices[0].message.content ?? "",
  };
}

export async function processMultipleTargets(
  input: string,
  actionType: ActionType,
  targets: Target[],
): Promise<GeneratedOutput[]> {
  return Promise.all(targets.map((t) => processAction(input, actionType, t)));
}
```

### Customizing types (targets, action types)

Edit `src/types/index.ts` to match your domain:

```ts
// Before: generic output_a, output_b...
export type Target = "output_a" | "output_b" | ...

// After: your domain
export type Target = "twitter" | "linkedin" | "email" | "report";

export const TARGET_LABELS: Record<Target, string> = {
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  email: "Email",
  report: "Report",
};
```

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── action/          # POST /api/action — core processing endpoint
│   │   ├── history/         # GET /api/history — fetch past actions
│   │   ├── stripe/          # checkout, portal, webhook
│   │   └── user/            # GET /api/user — credits & plan info
│   ├── dashboard/
│   │   ├── page.tsx         # Dashboard home (server component)
│   │   ├── DashboardClient.tsx
│   │   ├── history/         # Action history list + detail modal
│   │   ├── new/             # Run a new action
│   │   └── settings/        # Brand settings, defaults, account, subscription
│   └── login/
├── components/
│   ├── Sidebar.tsx
│   ├── PlatformCard.tsx     # Output card with copy/edit/favorite
│   └── ...
├── lib/
│   ├── actions.ts           # AI stub — replace this with your logic
│   ├── auth.ts              # NextAuth config
│   ├── db.ts                # Prisma client singleton
│   └── stripe.ts            # Stripe helpers + plan config
└── types/
    └── index.ts             # ActionType, Target, PLAN_LIMITS, etc.

prisma/
├── schema.prisma
└── seed.ts
```

---

## Deploy to Vercel

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env` to Vercel's dashboard
4. Set `DATABASE_URL` to a PostgreSQL connection string (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com))
5. Update `prisma/schema.prisma` datasource to `postgresql`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
6. Deploy — `vercel.json` runs `prisma generate` automatically before build

For Stripe webhooks in production, create a new webhook in the Stripe dashboard pointing to `https://yourdomain.com/api/stripe/webhook`.

---

## Switching OAuth Providers

`src/lib/auth.ts` configures providers. Add or remove as needed:

```ts
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
// ...

providers: [
  GitHub({ clientId: process.env.AUTH_GITHUB_ID!, clientSecret: process.env.AUTH_GITHUB_SECRET! }),
  Discord({ clientId: process.env.AUTH_DISCORD_ID!, clientSecret: process.env.AUTH_DISCORD_SECRET! }),
],
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Sync schema to DB |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Load demo data |
| `npm run stripe:listen` | Forward Stripe webhooks locally |
