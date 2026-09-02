# interview-kit

Internal app for tracking ore dispatches. It lists dispatches per day, with their tonnage and status (`pending`, `in_transit`, `delivered`, `cancelled`), and lets you update the status from the table.

Stack: Next.js + NestJS + ts-rest + Zod + Drizzle + PostgreSQL, in a pnpm monorepo with Turborepo.

## Setup

Requirements: Node.js 22+, pnpm 9+ and Docker.

```bash
pnpm install
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
docker compose up -d db
pnpm db:push
pnpm db:seed
pnpm dev
```

- Web: http://localhost:3001
- API: http://localhost:3000/rest

`pnpm db:seed` restores the sample data at any time.

## Structure

```
apps/
  web/       Next.js — pages, components, TanStack Query hooks (tsr client) - front
  server/    NestJS — controllers and services implementing the contract - back
packages/ - base de datos
  api/       ts-rest contract + Zod schemas (shared between web and server)
  db/        Drizzle schema, seed and migrations
  env/       Typed environment variables
```

The contract in `packages/api` is the source of truth for the API: it defines routes, request/response schemas, and the types consumed by both the server and the frontend `tsr` client.

## Existing endpoints

| Method | Route                  | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/rest/dispatches`     | List all dispatches |
| PATCH  | `/rest/dispatches/:id` | Update a dispatch   |
| GET    | `/rest/health`         | Health check        |

## Issues to implement

There are two issues defined in `docs/issues/`, each with its context and acceptance criteria. Designing the solution — what to build on the backend and what on the frontend — is part of the work.

1. [Permitir filtrar los despachos por estado](docs/issues/01-filtro-por-estado.md)
2. [Mostrar toneladas por estado para una fecha](docs/issues/02-stats-por-fecha.md)

## Scripts

- `pnpm dev` — start web and server in development mode
- `pnpm build` — build everything
- `pnpm test` — run tests (integration tests need the docker database running)
- `pnpm check-types` — type check across all workspaces
- `pnpm check` — lint and format (Oxlint + Oxfmt)
- `pnpm db:push` — apply the schema to the database
- `pnpm db:seed` — restore the sample data
- `pnpm db:studio` — UI to inspect the database
