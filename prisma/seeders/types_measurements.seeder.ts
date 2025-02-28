import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTypeMeasurements() {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.typeMeasurement.createMany({
        data: [{ name: 'Estado del equipo' }, { name: 'CPU' }, { name: 'Partición primaria C' }, { name: 'RAM' }, { name: 'RDP' }],
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
