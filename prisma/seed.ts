import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      {
        name: "Decoration",
        slug: "Decoration",
        description: "Truck Art & Decoration",
      },
      {
        name: "Lights",
        slug: "lights",
        description: "Vehicle Lighting",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: "Punjab Truck Art",
      phone: "03123456789",
      whatsapp: "03123456789",
      address: "Karachi, Pakistan",
    },
  });

  console.log("✅ Database Seeded Successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });