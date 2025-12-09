# Player Manager (Next.js)

Lightweight roster manager built with Next.js. Search, add, edit, and delete players with a clean modal flow.

- Live: https://sports-app-alpha-azure.vercel.app
- Stack: Next.js App Router, TypeScript, vanilla CSS

## Run locally

```bash
pnpm install   # or npm install / yarn
pnpm dev       # or npm run dev / yarn dev
# open http://localhost:3000
```

### Config

- `NEXT_PUBLIC_API_BASE`

## Code map

- `src/app/page.tsx` — page-level data flow (fetch, mutate, filter/search) and modal control.
- `src/app/components/` — UI pieces: header, table, form, modal.
- `src/lib/api.ts` — typed API helper for the Sports API.
- `next.config.ts` — static export settings for Pages.

## Scripts

- `pnpm dev` — start local dev server.
- `pnpm build` — production build.
- `pnpm lint` — lint the project.
