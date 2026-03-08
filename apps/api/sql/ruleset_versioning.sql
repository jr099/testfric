CREATE TABLE IF NOT EXISTS ruleset_versions (
  id UUID PRIMARY KEY,
  domain TEXT NOT NULL,
  version TEXT NOT NULL,
  payload JSONB NOT NULL,
  effective_from TIMESTAMPTZ NOT NULL,
  effective_to TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(domain, version)
);
