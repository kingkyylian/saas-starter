"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "SaaS Starter";
const APP_DESC = process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? "The fastest way to ship your SaaS.";

// ── Helpers ──────────────────────────────────────────────────────────────────

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#2a2a2a] bg-[#111] ${
        hover
          ? "transition-all duration-300 hover:border-[#383838] hover:bg-[#161616]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconAuth() {
  return (
    <svg className="h-7 w-7 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

function IconStripe() {
  return (
    <svg className="h-7 w-7 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
  );
}

function IconAI() {
  return (
    <svg className="h-7 w-7 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
    </svg>
  );
}

function IconDB() {
  return (
    <svg className="h-7 w-7 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg className="h-7 w-7 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  );
}

function IconCredits() {
  return (
    <svg className="h-7 w-7 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

function IconDeploy() {
  return (
    <svg className="h-8 w-8 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg className="h-8 w-8 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  );
}

function IconEnv() {
  return (
    <svg className="h-8 w-8 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function IconX() {
  return (
    <svg className="h-5 w-5 text-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: <IconAuth />,
    title: "Auth, Zero Config",
    description: "Google & GitHub OAuth wired up with NextAuth v5. Session handling, protected routes, and Prisma adapter — all done.",
  },
  {
    icon: <IconStripe />,
    title: "Stripe Subscriptions",
    description: "Checkout sessions, customer portal, and webhook handling are ready to go. Free and Pro tiers with credit limits built in.",
  },
  {
    icon: <IconAI />,
    title: "AI Drop-in Point",
    description: "One file to edit. Connect OpenAI, Anthropic, or any API in minutes. The UI, API routes, and history are already wired.",
  },
  {
    icon: <IconDB />,
    title: "Database + ORM",
    description: "Prisma with SQLite for development, PostgreSQL for production. Schema, migrations, and a seed script included.",
  },
  {
    icon: <IconDashboard />,
    title: "Dashboard UI",
    description: "Dark-mode dashboard with Framer Motion animations, action history, settings page, and a beautiful landing page.",
  },
  {
    icon: <IconCredits />,
    title: "Credit System",
    description: "Per-user credit tracking tied to subscription tier. Free users get 5/month, Pro users get 100. Enforced server-side.",
  },
];

const steps = [
  {
    icon: <IconEnv />,
    step: "01",
    title: "Configure",
    description: "Copy .env.example, fill in your OAuth keys, Stripe keys, and database URL. Takes about 10 minutes.",
  },
  {
    icon: <IconCode />,
    step: "02",
    title: "Add Your Logic",
    description: "Edit src/lib/actions.ts to plug in your AI call or processing logic. Everything else is already connected.",
  },
  {
    icon: <IconDeploy />,
    step: "03",
    title: "Deploy",
    description: "Push to GitHub, import to Vercel, add env vars. vercel.json handles prisma generate automatically.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Let users try before they pay.",
    features: [
      { text: "5 actions / month", included: true },
      { text: "3 output targets", included: true },
      { text: "Action history", included: true },
      { text: "Priority processing", included: false },
      { text: "6 output targets", included: false },
      { text: "API access", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For power users who need more.",
    features: [
      { text: "100 actions / month", included: true },
      { text: "6 output targets", included: true },
      { text: "Action history", included: true },
      { text: "Priority processing", included: true },
      { text: "Settings & preferences", included: true },
      { text: "API access", included: false },
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    description: "For teams and high-volume usage.",
    features: [
      { text: "Unlimited actions", included: true },
      { text: "6 output targets", included: true },
      { text: "Action history", included: true },
      { text: "Priority processing", included: true },
      { text: "Settings & preferences", included: true },
      { text: "Full API access", included: true },
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Indie Hacker",
    text: "I spent 3 weeks setting up auth and Stripe on my last project. With this starter I was live in an afternoon. Genuinely the best $99 I've spent.",
    avatar: "AM",
  },
  {
    name: "James Liu",
    role: "Freelance Developer",
    text: "The Stripe webhook handling alone is worth the price. It's always the thing that trips me up on client projects. Now I just clone this.",
    avatar: "JL",
  },
  {
    name: "Sofia Park",
    role: "Solo Founder",
    text: "I plugged in my Anthropic API key, updated a few types, and had a paying SaaS running in a weekend. Incredible starting point.",
    avatar: "SP",
  },
];

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const stack = [
  "Next.js 15", "Tailwind v4", "Framer Motion", "NextAuth v5",
  "Prisma", "Stripe", "TypeScript", "SQLite / PostgreSQL",
];

// ── Stagger wrapper ───────────────────────────────────────────────────────────

function StaggerChildren({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-neutral-100 antialiased">

      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M17 3L7 21M7 3l10 18" />
              </svg>
            </div>
            <span className="text-base font-semibold tracking-tight text-white">{APP_NAME}</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-neutral-400 transition-colors hover:text-neutral-100">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="/login" className="hidden text-sm text-neutral-400 transition-colors hover:text-neutral-100 sm:block">
              Sign in
            </a>
            <a href="/login" className="rounded-lg border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/[0.10]">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2">
          <div className="h-[600px] w-[800px] rounded-full bg-white/[0.025] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-sm text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              Next.js 15 · NextAuth v5 · Stripe · Prisma
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl leading-[1.1] font-bold tracking-tight md:text-7xl">
              Ship your SaaS
              <br />
              <GradientText>in hours, not weeks.</GradientText>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
              {APP_DESC} Auth, payments, database, AI integration, and a dashboard UI — production-ready from day one.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/login"
                className="group flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-[#080808] transition-all hover:bg-neutral-200"
              >
                Try the Demo
                <span className="transition-transform group-hover:translate-x-0.5"><IconArrowRight /></span>
              </a>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 rounded-xl border border-[#2a2a2a] px-7 py-3.5 text-base font-medium text-neutral-400 transition-all hover:border-[#3a3a3a] hover:text-white"
              >
                How It Works
              </a>
            </div>

            <p className="mt-5 text-sm text-neutral-500">
              Free plan included. No credit card required.
            </p>
          </motion.div>

          {/* Code mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-16 max-w-3xl"
          >
            <GlassCard hover={false} className="overflow-hidden !border-white/[0.10] p-1">
              <div className="rounded-xl bg-[#0d0d0d] p-6 md:p-8 text-left font-mono text-sm">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
                  <span className="ml-3 font-sans text-xs text-neutral-500">src/lib/actions.ts</span>
                </div>
                <div className="space-y-1 leading-relaxed">
                  <p><span className="text-neutral-500">// Replace this stub with your AI logic</span></p>
                  <p className="mt-3"><span className="text-sky-400">import</span> <span className="text-neutral-300">Anthropic</span> <span className="text-sky-400">from</span> <span className="text-emerald-300">&quot;@anthropic-ai/sdk&quot;</span><span className="text-neutral-400">;</span></p>
                  <p className="mt-3"><span className="text-sky-400">const</span> <span className="text-neutral-300">client</span> <span className="text-neutral-400">=</span> <span className="text-sky-400">new</span> <span className="text-neutral-300">Anthropic</span><span className="text-neutral-400">();</span></p>
                  <p className="mt-3"><span className="text-sky-400">export async function</span> <span className="text-yellow-300">processAction</span><span className="text-neutral-400">(</span></p>
                  <p className="ml-4"><span className="text-neutral-300">input</span><span className="text-neutral-400">: </span><span className="text-sky-300">string</span><span className="text-neutral-400">, </span><span className="text-neutral-300">actionType</span><span className="text-neutral-400">: </span><span className="text-sky-300">ActionType</span><span className="text-neutral-400">, </span><span className="text-neutral-300">target</span><span className="text-neutral-400">: </span><span className="text-sky-300">Target</span></p>
                  <p><span className="text-neutral-400">) </span><span className="text-neutral-400">{"{"}</span></p>
                  <p className="ml-4"><span className="text-sky-400">const</span> <span className="text-neutral-300">res</span> <span className="text-neutral-400">=</span> <span className="text-sky-400">await</span> <span className="text-neutral-300">client</span><span className="text-neutral-400">.</span><span className="text-neutral-300">messages</span><span className="text-neutral-400">.</span><span className="text-yellow-300">create</span><span className="text-neutral-400">({"{"}...</span><span className="text-neutral-400">{"}"});</span></p>
                  <p className="ml-4"><span className="text-sky-400">return</span> <span className="text-neutral-400">{"{"} </span><span className="text-neutral-300">target</span><span className="text-neutral-400">, </span><span className="text-neutral-300">body</span><span className="text-neutral-400">: </span><span className="text-neutral-300">res</span><span className="text-neutral-400">.</span><span className="text-neutral-300">content</span><span className="text-neutral-400">[</span><span className="text-emerald-300">0</span><span className="text-neutral-400">].</span><span className="text-neutral-300">text</span> <span className="text-neutral-400">{"}"}</span><span className="text-neutral-400">;</span></p>
                  <p><span className="text-neutral-400">{"}"}</span></p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stack badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {stack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1 text-xs text-neutral-500">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution */}
      <Section className="py-24 md:py-32" id="problem">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-block rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-xs font-medium text-neutral-400">
                The Problem
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                SaaS boilerplate is a <span className="text-red-400">time sink</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-400">
                Every SaaS needs the same foundation: auth, payments, database, a dashboard. You spend the first 2-3 weeks writing plumbing instead of building product.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "2-3 weeks to set up auth + Stripe alone",
                  "Webhook edge cases that bite you in production",
                  "No time left to build what actually matters",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1e1e1e]">
                      <IconX />
                    </div>
                    <span className="text-neutral-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 inline-block rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-xs font-medium text-neutral-400">
                The Solution
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Start with everything. <span className="text-white">Ship the product.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-neutral-400">
                Clone, add your env vars, drop in your core logic, and deploy. The boring stuff is done. You focus on what makes your product unique.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Auth + payments running in under an hour",
                  "Webhook handling tested and edge-case safe",
                  "Ship your first paying user faster",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1e1e1e]">
                      <IconCheck />
                    </div>
                    <span className="text-neutral-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="py-24 md:py-32" id="features">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Everything wired up, ready to customize
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Not a toy project. A production-grade foundation you can ship to real users.
            </p>
          </div>

          <StaggerChildren className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <GlassCard className="h-full p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#222] bg-[#1a1a1a]">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{feature.description}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="py-24 md:py-32" id="how-it-works">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Three steps to live
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              From clone to paying users in the same day.
            </p>
          </div>

          <StaggerChildren className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <StaggerItem key={step.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="absolute top-12 left-full hidden h-px w-full bg-gradient-to-r from-emerald-500/30 to-transparent md:block" />
                )}
                <div className="text-center">
                  <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl border border-[#222] bg-[#111]" />
                    {step.icon}
                  </div>
                  <div className="mb-2 text-xs font-bold tracking-widest text-neutral-500 uppercase">
                    Step {step.step}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </Section>

      {/* Pricing */}
      <Section className="py-24 md:py-32" id="pricing">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Start free. Upgrade when you are ready. No hidden fees.
            </p>
          </div>

          <StaggerChildren className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.name}>
                <GlassCard
                  className={`relative flex h-full flex-col p-8 ${
                    plan.popular
                      ? "!border-white/20 !bg-[#161616] shadow-[0_0_40px_-8px_rgba(255,255,255,0.06)] hover:!border-white/30 hover:!bg-[#1a1a1a]"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-semibold text-[#080808]">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-neutral-500">{plan.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-400">{plan.description}</p>
                  </div>

                  <div className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature.text} className="flex items-center gap-3">
                        {feature.included ? <IconCheck /> : <IconX />}
                        <span className={feature.included ? "text-sm text-neutral-300" : "text-sm text-neutral-600"}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="/login"
                    className={`block rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                      plan.popular
                        ? "bg-white text-[#080808] hover:bg-neutral-200"
                        : "border border-white/[0.08] text-neutral-300 hover:border-white/[0.15] hover:bg-white/[0.03]"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-24 md:py-32" id="testimonials">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Built for indie hackers
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Developers who ship fast and want to spend time on product, not plumbing.
            </p>
          </div>

          <StaggerChildren className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <GlassCard className="flex h-full flex-col p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => <IconStar key={i} />)}
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-300">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 border-t border-white/[0.06] pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e1e1e] text-sm font-semibold text-neutral-300">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-neutral-500">{t.role}</div>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <GlassCard hover={false} className="relative overflow-hidden px-8 py-16 text-center md:px-16 md:py-24">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[100px]" />
            </div>

            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
                Stop building boilerplate.{" "}
                Start building product.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
                Everything you need to launch a SaaS — auth, payments, database, AI, and a dashboard — ready in minutes.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/login"
                  className="group flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#080808] transition-all hover:bg-neutral-200"
                >
                  Try the Demo
                  <span className="transition-transform group-hover:translate-x-0.5"><IconArrowRight /></span>
                </a>
              </div>
              <p className="mt-4 text-sm text-neutral-500">
                Free plan included. No credit card required.
              </p>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <a href="#" className="text-xl font-bold tracking-tight">
                <GradientText>{APP_NAME}</GradientText>
              </a>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500">
                {APP_DESC}
              </p>
            </div>
            <div className="flex flex-wrap gap-8 text-sm">
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Sign In", href: "/login" },
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-neutral-500 transition-colors hover:text-neutral-300">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
            <p className="text-sm text-neutral-600">
              &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
