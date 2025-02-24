import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Conexión a la base de datos establecida correctamente');
    } catch (error) {
      console.error('❌ Error al conectar a la base de datos:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Desconectado de la base de datos');
  }
}
