import { PrismaClient, CurrencyCode } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@pulseplay.local" },
    update: {},
    create: { email: "demo@pulseplay.local" }
  });

  for (const currency of Object.values(CurrencyCode)) {
    await prisma.wallet.upsert({
      where: { userId_currency: { userId: user.id, currency } },
      update: {},
      create: { userId: user.id, currency }
    });
  }
}

main().finally(async () => prisma.$disconnect());
