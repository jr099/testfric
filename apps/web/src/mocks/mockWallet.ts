export const mockWalletBalances = [
  { currency: "COINS", available: 12500, locked: 0 },
  { currency: "TICKETS", available: 8, locked: 0 },
  { currency: "XP_SEASON", available: 4200, locked: 0 },
  { currency: "GEMS", available: 130, locked: 0 },
  { currency: "REWARD_CREDITS", available: 240, locked: 0 }
];

export const mockWalletLedger = [
  { id: "tx_1", type: "GAME_REWARD", reason: "daily_game_win", amount: "+450", createdAt: "2026-11-08T08:40:00Z" },
  { id: "tx_2", type: "TICKET_SPEND", reason: "game_entry", amount: "-1", createdAt: "2026-11-08T08:35:00Z" },
  { id: "tx_3", type: "REWARD_CLAIM", reason: "avatar_neon_pack", amount: "-150", createdAt: "2026-11-07T20:10:00Z" }
];
