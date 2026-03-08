import { CurrencyCode } from "./currencies";

export interface WalletBalance {
  currency: CurrencyCode;
  available: number;
  locked: number;
}

export interface LedgerEntry {
  id: string;
  currency: CurrencyCode;
  type: string;
  amount: number;
  reason: string;
  createdAt: string;
}
