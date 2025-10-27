# ACT 2.0 React + Express Starter

This workspace bootstraps an ACT 2.0 playground with:

- A **Next.js 16** frontend using React 19, Tailwind CSS v4, and shadcn/ui components for ready-to-use styling.
- A **TypeScript Express** server wired to the Vercel AI SDK for OpenAI-powered endpoints.

The setup follows the guidance from the Vercel AI SDK getting started guide and is ready for further ACT 2.0 integrations.

## Prerequisites

- Node.js 20+
- npm 10+
- An OpenAI API key (`OPENAI_API_KEY`)

## Project Structure

```
frontend/   # Next.js app with Tailwind + shadcn/ui
backend/    # Express server with AI SDK
```

### Frontend (`frontend/`)

- Tailwind CSS configured via the Next.js v4 preset.
- shadcn/ui initialized with a curated component set (`button`, `card`, `textarea`, `dialog`, etc.).
- `src/app/page.tsx` demonstrates calling the Express backend and showcases styled UI pieces.
- `ThemeProvider` and `Toaster` are wired for dynamic theming and notifications.

### Backend (`backend/`)

- Express server (`src/server.ts`) exposing `/api/chat` and `/health` endpoints.
- Uses `generateText` from the Vercel AI SDK with `gpt-4o-mini` for quick iterations.
- Configured TypeScript build outputs to `dist/` with scripts for dev, build, and start.

## Environment Variables

Duplicate the provided examples and fill in real values:

```
cp frontend/env.local.example frontend/.env.local
cp backend/env.example backend/.env
```

Then edit the files:

- `frontend/.env.local` → `NEXT_PUBLIC_API_URL=http://localhost:4000`
- `backend/.env` → `PORT=4000` (optional) and `OPENAI_API_KEY=your-openai-key`

## Installation

Install dependencies for both apps:

```
cd frontend && npm install
cd ../backend && npm install
```

## Development

Run the backend and frontend in separate terminals:

```
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

Visit http://localhost:3000 to use the UI. The frontend calls the Express backend at `NEXT_PUBLIC_API_URL`.

## Production Build

```
cd backend
npm run build
npm start

cd ../frontend
npm run build
npm start
```

## Extending

- Add more shadcn/ui components via `npx shadcn@latest add <component>`.
- Extend the Express API with additional AI routes or Supabase integrations.
- Replace the simple prompt-based flow with authenticated ACT 2.0 agents, RAG lookups, or workflow execution.

## References

- Vercel AI SDK – Getting Started: https://ai-sdk.dev/docs/getting-started

# ACT.test
# ACT.test
