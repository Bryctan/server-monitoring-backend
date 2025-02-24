import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTypeMeasurements() {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.typeMeasurement.createMany({
        data: [{ name: 'CPU' }, { name: 'RAM' }, { name: 'DISCO' }],
      });
    });

    console.log('✅ type_measurements seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding type_measurements:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedTypeMeasurements();
}
