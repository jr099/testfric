# PulsePlay Monorepo (Vite + Supabase)

Modern, mobile-first scaffold for a gamification and rewards platform.

## Structure
- `apps/web`: Vite + React + TypeScript frontend
- `packages/ui`: design-system primitives
- `packages/types`: shared domain and API types
- `packages/config`: runtime and environment config
- `packages/game-engine`: score/rules helpers
- `packages/shared`: cross-domain helpers
- `supabase/functions`: Edge Functions for sensitive workflows
- `supabase/migrations`: PostgreSQL schema and RLS policies
- `supabase/seed`: deterministic seed scripts/data
