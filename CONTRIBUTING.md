# Contributing

This repository is a reference Next.js SaaS starter. Contributions should keep
the starter small, understandable, and easy to adapt.

## Before Opening a PR

- Keep changes focused on one integration or workflow.
- Do not commit real secrets, OAuth credentials, Stripe keys, or database dumps.
- Update `.env.example` when adding required environment variables.
- Include the closest useful verification command in the PR description.

## Local Development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Run the closest checks before submitting:

```bash
npm run lint
npm run build
```

## High-Risk Areas

Authentication, Stripe payments, webhook handling, Prisma schema changes, and
production deployment configuration should include clear setup notes and manual
verification steps.
