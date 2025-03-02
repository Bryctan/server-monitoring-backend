import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMetrics() {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.metric.createMany({
        data: [
          { name:"Tiempo encedido", identifier: 'windows_system_system_up_time' },
          { name:"Tiempo de CPU", identifier: 'windows_cpu_time_total{core="0,0",mode="user"}' },
          { name:"Espacio libre", identifier: 'windows_logical_disk_free_bytes{volume="C:"}' },
          { name:"Memoria usada", identifier: 'windows_memory_committed_bytes' },
          { name:"Usuarios conectados", identifier: 'windows_terminal_services_session_info' },
        ],
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
