# PulsePlay Monorepo (Vite + Supabase)

## 1) Présentation rapide
PulsePlay est un socle moderne de plateforme gamifiée avec frontend **Vite + React + TypeScript** et backend managed via **Supabase** (Auth, Postgres, Storage, Edge Functions, Realtime).
Le monorepo est conçu pour démarrer vite en développement local avec un **mode mock** sans dépendance externe.

## 2) Prérequis
- Node.js 18+
- npm 9+

## 3) Installation
```bash
git clone <repo-url>
cd testfric
npm install
```

## 4) Lancer le frontend (mode mock)
```bash
npm run dev:web
```
Le frontend fonctionne **sans Supabase** si `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` ne sont pas définies.
Dans ce cas, les pages utilisent des données locales (`apps/web/src/mocks`) et ne font aucune requête réseau externe.

## 5) Lancer avec Supabase
1. Créer un projet Supabase.
2. Appliquer les migrations SQL dans `supabase/migrations`.
3. (Optionnel) Charger `supabase/seed/seed.sql`.
4. Copier `apps/web/.env.example` vers `.env` et renseigner :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Redémarrer le frontend.

## 6) Structure du repo
- `apps/` : application frontend Vite (`apps/web`)
- `packages/` : modules partagés (`ui`, `types`, `config`, `game-engine`, `shared`)
- `supabase/` : migrations SQL, seed, edge functions

## 7) Supabase
- `supabase/migrations` : schéma PostgreSQL + RLS + RPC
- `supabase/seed` : données d’amorçage
- `supabase/functions` : Edge Functions (`payments-webhook`, `reward-claim`, `withdrawal-request`)

## 8) Commandes utiles
```bash
npm run dev:web
npm run build:web
npm run preview:web
npm run typecheck
```

## 9) Principes architecture
- Ledger append-only (`wallet_ledger`)
- RLS basée sur `auth.uid()`
- `rule_versions` versionnées avec dates d’effet
- Edge Functions pour flux sensibles (paiements, claim rewards, withdrawals)
- Authentification via Supabase Auth
