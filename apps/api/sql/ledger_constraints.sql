-- Append-only guard for wallet transactions table
-- Intended for migration integration.
ALTER TABLE wallet_transactions
  ADD CONSTRAINT wallet_transactions_amount_non_zero CHECK (amount <> 0);
