import { Module } from '@nestjs/common';
import { ServersModule } from './servers/servers.module';
import { PrismaModule } from './prisma/prisma.module';
import { TypesMeasurementsModule } from './types-measurements/types-measurements.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [ServersModule, PrismaModule, TypesMeasurementsModule, MetricsModule],
})
export class AppModule {}
