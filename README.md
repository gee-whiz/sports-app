# Player Manager (Next.js)

Lightweight roster manager built with Next.js. Lists players and lets you add, edit, and delete them via the Sports API.

## Run locally

```bash
pnpm install   # or npm install / yarn
pnpm dev       # or npm run dev / yarn dev
# App runs at http://localhost:3000
```

Optional config:

- `NEXT_PUBLIC_API_BASE`: override the API base URL (defaults to `https://sportsapp-wine.vercel.app`).

## Code structure

- `src/app/page.tsx` — page with data logic for listing and mutating players.
- `src/app/components/` — UI pieces (header, table, form, modal).
- `src/lib/api.ts` — typed API helper for the Sports API.

## Lint

```bash
pnpm lint
```
