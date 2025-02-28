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
    // Mapa de intervalos por cliente y servidor
    const clientServerKey = `${client.id}-server-${serverId}`;

    if (this.clientIntervals.has(clientServerKey)) {
      return; // Evita crear múltiples intervalos para el mismo cliente y servidor
    }

    this.clearClientInterval(clientServerKey);

    const interval = setInterval(async () => {
      await this.sendMetrics(client,serverId);
    }, 8000);

    this.clientIntervals.set(clientServerKey, interval);
    client.on('disconnect', () => this.clearClientInterval(clientServerKey));
  }

  private async sendMetrics(client: Socket, serverId: number) {
    try {
      const metrics = await this.metricsService.getPrometheusMetrics(serverId);


      
      client.emit('dataMetrics', { server: metrics[0].server, metrics });
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