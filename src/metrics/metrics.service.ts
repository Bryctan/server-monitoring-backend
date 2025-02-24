import { Injectable } from '@nestjs/common';
import { ServersService } from 'src/servers/servers.service';

@Injectable()
export class MetricsService {
  constructor(private readonly serversService: ServersService) {}

  async getPrometheusMetrics(serverId: number) {
    const server = await this.serversService.findOne(serverId);


    let textplain = {
      'win-cpu-core-1': '0.1',
      'win-cpu-core-2': '0.2',
      'win-cpu-core-3': '0.3',
      'win-cpu-core-4': '0.4',
      'win-ram-core-bytes': '5e9+4',
      'win-ram-capacity': '1bg9d3a',
      'win-disk-core-gb': '654215sae',
      "users_capacity": '185',
    };

    return server.typeMeasurements?.map(typeMeasurement => ({
      name: typeMeasurement.name,
      metrics: typeMeasurement.metrics?.map(metric => ({
        identifier: metric.identifier,
        value: textplain[metric.identifier] || '',
      })) || [],
    })) || [];

    //const metrics = fetch(server?.ipAddress + '/metrics').then((res) => res.text());
    // let metrics = await fetch('http://localhost:3000/servers/1').then((res) =>
    //   res.json(),
    // );

    //return metrics;
  }
}
