import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServersService {
  constructor(private prisma: PrismaService) {}

  async create(createServerDto: CreateServerDto) {
    const server = await this.prisma.$transaction(async (tx) => {
      return tx.server.create({
        data: {
          ...createServerDto,
          typeMeasurements: {
            create: createServerDto.typeMeasurements?.map((id) => ({
              typeMeasurementId: id,
            })),
          },
        },
        include: {
          typeMeasurements: {
            include: {
              typeMeasurement: true,
            },
          },
        },
      });
    });

    return {
      ...server,
      typeMeasurements: server.typeMeasurements.map((tm) => tm.typeMeasurement),
    };
  }

  async findAll() {
    return await this.prisma.server
      .findMany({
        include: {
          typeMeasurements: {
            select: {
              typeMeasurement: true, // Incluir solo los detalles del tipo de medición
            },
          },
        },
      })
      .then((servers) => {
        // Extraemos solo los objetos de tipo de medición directamente de cada servidor
        return servers.map((server) => ({
          ...server,
          typeMeasurements: server.typeMeasurements.map(
            (tm) => tm.typeMeasurement,
          ),
        }));
      });
  }

  async findOne(id: number) {
    const server = await this.prisma.server.findUnique({
      where: { id },
      include: {
        typeMeasurements: {
          include: {
            typeMeasurement: {
              include: {
                metrics: {
                  include: {
                    metric: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      ...server,
      typeMeasurements: server?.typeMeasurements.map(({ typeMeasurement }) => ({
        ...typeMeasurement,
        metrics: typeMeasurement.metrics.map(({ metric }) => metric),
      })),
    };
  }

  async update(id: number, updateServerDto: UpdateServerDto) {
    const server = await this.prisma.$transaction([
      this.prisma.serverTypeMeasurement.deleteMany({
        where: { serverId: id },
      }),
      this.prisma.server.update({
        where: { id },
        data: {
          ...updateServerDto,
          typeMeasurements: {
            create: updateServerDto.typeMeasurements?.map((id) => ({
              typeMeasurementId: id,
            })),
          },
        },
        include: {
          typeMeasurements: {
            include: {
              typeMeasurement: true,
            },
          },
        }
      }),
      
    ]);

    return {
      ...server[1],
      typeMeasurements: server[1].typeMeasurements.map((tm) => tm.typeMeasurement),
    }
  }

  //Inactivar
  // remove(id: number) {
  //   return `This action removes a #${id} server`;
  // }
}
