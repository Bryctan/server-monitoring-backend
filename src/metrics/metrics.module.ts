import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsGateway } from './metrics.gateway';
import { ServersService } from 'src/servers/servers.service';

@Module({
  providers: [MetricsGateway, MetricsService, ServersService],
})
export class MetricsModule {}
