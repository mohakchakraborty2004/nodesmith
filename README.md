# Nodesmith

<div align="center">
  <h3>🔧 The Human Algorithm</h3>
  <p>Build complex AI workflows as naturally as writing in a journal. Nodesmith bridges the gap between machine precision and human intuition.</p>
</div>

---

## 📖 Overview

Nodesmith is a powerful visual workflow automation platform built with Next.js 15, enabling users to create, orchestrate, and execute complex AI-powered workflows through an intuitive drag-and-drop interface.

### ✨ Key Features

- **🎨 Visual Workflow Editor** - Drag-and-drop canvas powered by React Flow for building complex automation workflows
- **🤖 AI Integration** - Built-in Gemini AI node support via Vercel AI SDK
- **🔗 HTTP Triggers** - Make external API calls with configurable endpoints and methods
- **📝 Google Forms Integration** - Trigger workflows from Google Form submissions
- **⚡ Background Execution** - Reliable workflow execution using Inngest for durable functions
- **🔐 Authentication** - Secure authentication with Better Auth (email/password, OAuth)
- **💳 Subscription Management** - Polar integration for payment processing and subscription tiers
- **🎯 Type-Safe API** - End-to-end type safety with tRPC

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Database** | PostgreSQL + Prisma ORM |
| **API Layer** | tRPC v11 |
| **State Management** | TanStack Query, Jotai, nuqs |
| **Workflow Canvas** | React Flow (@xyflow/react) |
| **Background Jobs** | Inngest |
| **Authentication** | Better Auth |
| **Payments** | Polar |
| **AI** | Vercel AI SDK + Google Gemini |
| **UI Components** | shadcn/ui, Radix UI, Lucide Icons |
| **Styling** | Tailwind CSS v4 |
| **Forms** | React Hook Form + Zod |

---

## 📁 Project Structure

```
nodesmith/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth routes (login, signup)
│   │   ├── api/
│   │   │   ├── auth/          # Better Auth API routes
│   │   │   ├── google-form/   # Google Form webhook endpoint
│   │   │   ├── inngest/       # Inngest functions & route
│   │   │   └── trpc/          # tRPC API handler
│   │   ├── dashboard/         # User dashboard
│   │   ├── workflows/         # Workflow list page
│   │   └── workflow/[id]/     # Workflow editor page
│   ├── components/
│   │   ├── auth/              # Login & Signup forms
│   │   ├── dashboard/         # Dashboard components
│   │   ├── landing.tsx        # Landing page
│   │   ├── ui/                # shadcn/ui components
│   │   ├── workflow/          # Workflow list components
│   │   └── workflowById/      # Workflow editor
│   │       └── editor-canvas/
│   │           ├── Triggers/  # Trigger nodes (Manual, Google Form)
│   │           ├── excutions/ # Execution nodes (HTTP, Gemini)
│   │           └── editor.tsx # Main canvas component
│   ├── generated/
│   │   └── prisma/            # Generated Prisma client
│   ├── hooks/                 # Custom React hooks
│   │   ├── client-suspense.ts # Data fetching hooks
│   │   ├── params/            # URL param management (nuqs)
│   │   └── subscription/      # Polar subscription hooks
│   ├── inngest/
│   │   └── client.ts          # Inngest client configuration
│   ├── lib/
│   │   ├── auth.ts            # Better Auth configuration
│   │   ├── auth-utils.ts      # Auth utilities (RequireAuth)
│   │   ├── db.ts              # Prisma client instance
│   │   ├── executorFns.ts     # Node executor registry
│   │   ├── polar.ts           # Polar SDK client
│   │   ├── topology-sort-util.ts # DAG sorting for execution
│   │   └── types-executor-Fns.ts # Executor type definitions
│   ├── server/
│   │   └── router.ts          # Workflow tRPC router
│   └── trpc/
│       ├── client.tsx         # tRPC React client
│       ├── init.ts            # tRPC initialization & procedures
│       ├── routers/_app.ts    # Root tRPC router
│       └── server.tsx         # tRPC server utilities
└── package.json
```

---

## 🗄️ Database Schema

### Core Models

- **User** - User accounts with Better Auth integration
- **Session** - User sessions for authentication
- **Account** - OAuth provider accounts
- **Workflow** - User-created workflows
- **Node** - Individual nodes within a workflow
- **Connections** - Edges connecting nodes

### Node Types

```typescript
enum NodeType {
  INITIAL           // Starting point
  MANUAL_TRIGGER    // Manual execution trigger
  HTTP_TRIGGER      // HTTP request execution
  GOOGLE_FORM_TRIGGER // Google Form webhook trigger
  GEMINI_TRIGGER    // AI text generation with Gemini
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Inngest CLI (for local development)

### Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Polar (Payments)
POLAR_ACCESS_TOKEN="..."
POLAR_SUCCESS_URL="http://localhost:3000/workflows"

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY="..."

# Public
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev

# In a separate terminal, start Inngest dev server
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔄 Workflow Execution

Nodesmith uses a **topological sort** algorithm to determine the correct execution order of nodes in a workflow:

1. **Trigger** - User initiates execution (manual, webhook, or form submission)
2. **Sort** - Nodes are sorted based on their connections (DAG)
3. **Execute** - Each node runs sequentially with context passing
4. **Result** - Final context is returned

### Execution Flow

```
Trigger → Inngest Event → Sort Nodes → Execute Each Node → Return Result
```

### Node Executors

Each node type has a dedicated executor function:

- `manualTriggerExecutor` - Initializes execution context
- `httpTriggerExecutor` - Makes HTTP requests with Handlebars templating
- `GoogleTriggerExecutor` - Processes Google Form data
- `GeminiTriggerExecutor` - Generates AI text responses

---

## 🔐 Authentication & Authorization

### Procedures

| Procedure | Description |
|-----------|-------------|
| `baseProcedure` | No authentication required |
| `protectedProcedure` | Requires authenticated user |
| `paidProcedure` | Requires active Polar subscription |

### Auth Flow

1. User signs up/logs in via Better Auth
2. Session is stored in database
3. tRPC procedures validate session via headers
4. Polar subscription status checked for premium features

---

## 📡 API Routes

### tRPC Endpoints

| Endpoint | Type | Description |
|----------|------|-------------|
| `workflow.createWorkflow` | Mutation | Create new workflow |
| `workflow.deleteWorkflow` | Mutation | Delete workflow |
| `workflow.updateWorkflow` | Mutation | Update workflow name |
| `workflow.getWorkflows` | Query | List workflows (paginated) |
| `workflow.getWorkflowById` | Query | Get workflow details |
| `workflow.updateWorkflowNodes` | Mutation | Save workflow nodes/edges |
| `workflow.executeWorkflow` | Mutation | Trigger workflow execution |

### Webhooks

- `POST /api/google-form?workflowId={id}` - Google Form submission webhook

---

## 🎨 UI Components

The project uses **shadcn/ui** with custom theming:

- Material Design 3 color system (surface, primary, on-surface, etc.)
- Custom animations (`animate-fade-in`, `animate-slide-down`)
- Geometric background patterns on auth pages
- Dark mode support via `next-themes`

---

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

---

## 🛠️ Development

### Adding a New Node Type

1. Add enum value to `prisma/schema.prisma`
2. Create node component in `components/workflowById/editor-canvas/`
3. Create executor function
4. Register executor in `lib/executorFns.ts`
5. Add node to selector in `Nodeselector.tsx`

### Database Changes

```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Generate client
npx prisma generate

# View database
npx prisma studio
```

---

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

<div align="center">
  <p>Built with ❤️ using Next.js, tRPC, and Inngest</p>
  <p><strong>Nodesmith</strong> - The Human Algorithm</p>
</div>

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
