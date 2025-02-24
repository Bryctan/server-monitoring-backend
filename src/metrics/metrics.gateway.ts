import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MetricsService } from './metrics.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class MetricsGateway {
  @WebSocketServer()
  server: Server;

  private clientIntervals = new Map<string, NodeJS.Timeout>();

  constructor(private readonly metricsService: MetricsService) {}

  @SubscribeMessage('metrics')
  async handleMetrics(client: Socket, serverId: number) {
    if (this.clientIntervals.has(client.id)) {
      return; // Evita crear múltiples intervalos para el mismo cliente
    }

    this.clearClientInterval(client.id);

    const interval = setInterval(async () => {
      await this.sendMetrics(client, serverId);
    }, 8000);

    this.clientIntervals.set(client.id, interval);
    client.on('disconnect', () => this.clearClientInterval(client.id));
  }

  private async sendMetrics(client: Socket, serverId: number) {
    try {
      const metrics = await this.metricsService.getPrometheusMetrics(serverId);
      client.emit('dataMetrics', metrics);
    } catch (error) {
      console.error('Error obteniendo métricas:', error);
    }
  }

  private clearClientInterval(clientId: string) {
    if (this.clientIntervals.has(clientId)) {
      clearInterval(this.clientIntervals.get(clientId));
      this.clientIntervals.delete(clientId);
    }
  }
}
