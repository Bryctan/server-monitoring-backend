import { Injectable } from '@nestjs/common';
import { ServersService } from 'src/servers/servers.service';

@Injectable()
export class MetricsService {
  constructor(private readonly serversService: ServersService) {}

  async getPrometheusMetrics(serverId: number) {
    // Buscamos el servidor en la base de datos
    const server = await this.serversService.findOne(serverId);
    
    if (!server) {
      console.error(`Server ${serverId} not found`);
      return []; // Si no encontramos el servidor, retornamos un array vacío
    }

    //let metricsText = this.convertToJSON(metrics);
    //console.log(metricsText);

    // server.typeMeasurements?.metrics?.forEach((metric) => {
    //  // metricsText[typeMeasurement.name] = typeMeasurement.value;
      
    // });
    //console.log(metricsText['windows_cpu_time_total{core="0,0",mode="user"}']);


    console.log(server);
    return server;
    
    
    // try {
    //   // Intentamos obtener las métricas del servidor
    //   metricsText = await fetch(`http://${server.ipAddress}:9182/metrics`).then(
    //     (res) => res.text(),
    //   );

    //   if (!metricsText) {
    //     console.error(`Received empty metrics text for server ${serverId}`);
    //     return []; // Si el texto de métricas está vacío, retornamos un array vacío
    //   }
    // } catch (err) {
    //   console.error(`Error fetching metrics for server ${serverId}:`, err);
    //   return []; // Si ocurre un error, retornamos un array vacío
    // }

    // Convertimos el texto plano de Prometheus a JSON
    // const metricsJson = this.convertToJSON(metricsText);

    
    

    // // Construimos el objeto de resultados con los tipos de mediciones y métricas correspondientes
    // const results =
    //   server.typeMeasurements?.map((typeMeasurement) => ({
    //     name: typeMeasurement.name,
    //     metrics:
    //       typeMeasurement.metrics?.map((metric) => ({
    //         name: metric.name,
    //         identifier: metric.identifier,
    //         value: metricsJson[metric.identifier] || '', // Si no existe el identificador, retornamos un valor vacío
    //       })) || [],
    //   })) || [];

    // // Retornamos el array con los resultados de las métricas para el servidor
    // return [
    //   {
    //     server,
    //     metrics: results,
    //   },
    // ];
  }

  private convertToJSON(metricsText: string): Record<string, string> {
    const result: Record<string, string> = {};

    const lines = metricsText.split('\n');

    lines.forEach((line) => {
      if (line.startsWith('#') || !line.trim()) return;

      const [key, value] = line.split(' ');

      if (key && value) {
        result[key] = value;
      }
    });

    return result;
  }
}
