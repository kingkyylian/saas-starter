# Security Policy

This repository is a reference SaaS starter with authentication, payments, and
database examples. Treat example configuration as a starting point, not a
production security guarantee.

## Reporting a Vulnerability

Please do not open public issues for security reports.

Use GitHub's private vulnerability reporting flow if it is available for this
repository. If it is not available, contact the maintainer privately through the
GitHub profile.

Include:

- affected commit or deployed version
- reproduction steps
- affected flow, such as auth, Stripe webhook handling, database access, or API routes
- expected and observed behavior
- logs with secrets removed

## Scope

Security-sensitive areas include:

- OAuth and session handling
- Stripe checkout, portal, and webhook verification
- Prisma schema and database access
- environment variable handling
- API route authorization
- deployment configuration

Do not include real secrets, customer data, production webhook payloads, or
private database snapshots in public issues.
