import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMetrics() {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.metric.createMany({
        data: [{ identifier : 'windows_system_system_up_time' }, { identifier : 'windows_cpu_time_total{core="0,0",mode="user"}' }, { identifier : 'windows_logical_disk_free_bytes{volume="C:"}' }, { identifier : 'windows_memory_committed_bytes' }, { identifier : 'windows_terminal_services_session_info' }],
      });
    });

    console.log('✅ metrics seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding metrics:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedMetrics();
}
