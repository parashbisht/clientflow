# ClientFlow

A lead tracking dashboard with list and Kanban views, built with Next.js 16 and TypeScript.

## Features

- **Dashboard** with KPI cards summarizing lead metrics
- **Leads list view** with search, filter, and sort
- **Leads Kanban board** with drag-and-drop between status columns
- **Lead detail page** with full lead information
- **Command palette** (Cmd/Ctrl+K) for quick navigation
- **Responsive design**, works on mobile and desktop
- Built with **shadcn/ui** components on top of Tailwind CSS

> **Note on scope:** this project currently focuses on lead management and dashboard analytics. Client, task, project, and invoice modules are planned for a future version.

## Tech stack

| Category | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Forms & validation | React Hook Form, Zod |
| Charts | Recharts |
| Dates | date-fns |
| Icons | lucide-react |
| State | React Context (see `src/store`) |

## Folder structure

src/
├── app/ # Routes: /, /dashboard, /leads, /leads/[id]
├── components/
│ ├── common/ # Shared UI: KPI cards, Kanban board, skeletons, status badges
│ ├── layout/ # App shell, sidebar, topbar, command palette
│ └── ui/ # shadcn/ui primitives
├── services/ # Data-fetching logic (leads)
├── store/ # App-wide React Context state
├── data/ # In-memory seed data and mock "database"
├── types/ # Shared TypeScript types
└── lib/ # Constants and utilities

## Getting started

Requires Node.js 18 or later.

```bash
git clone https://github.com/parashbisht/clientflow.git
cd clientflow
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No database or environment variables are required — the app currently runs on in-memory seed data (`src/data/seed.ts`).

## Live demo

Live demo: [link here]

## Future improvements

- Clients module
- Tasks module
- Projects module
- Invoices module
- Persistent backend and database
- Authentication