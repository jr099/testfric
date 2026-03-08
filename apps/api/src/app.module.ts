import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { WalletModule } from "./modules/wallet/wallet.module";
import { GamesModule } from "./modules/games/games.module";
import { RewardsModule } from "./modules/rewards/rewards.module";
import { CompetitionsModule } from "./modules/competitions/competitions.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { WithdrawalsModule } from "./modules/withdrawals/withdrawals.module";
import { AuditModule } from "./modules/audit/audit.module";

@Module({
  imports: [
    AuthModule,
    WalletModule,
    GamesModule,
    RewardsModule,
    CompetitionsModule,
    PaymentsModule,
    WithdrawalsModule,
    AuditModule
  ]
})
export class AppModule {}
