import { Injectable } from '@nestjs/common';
import { CreateTypesMeasurementDto } from './dto/create-types-measurement.dto';
import { UpdateTypesMeasurementDto } from './dto/update-types-measurement.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypesMeasurementsService {
  constructor(private prisma: PrismaService) {}
  async create(createTypesMeasurementDto: CreateTypesMeasurementDto) {
    return await this.prisma.typeMeasurement.create({
      data: createTypesMeasurementDto,
    });
  }

  async findAll() {
    return await this.prisma.typeMeasurement.findMany({
      include: {
        servers: {
          select: {
            server: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.typeMeasurement.findUnique({
      where: { id },
      include: {
        servers: {
          select: {
            server: true,
          },
        },
      },
    });
  }

  update(id: number, updateTypesMeasurementDto: UpdateTypesMeasurementDto) {
    return this.prisma.typeMeasurement.update({
      where: { id },
      data: updateTypesMeasurementDto,
      include: {
        servers: {
          select: {
            server: true,
          },
        },
      },
    });
  }

  //Inactivar
  // remove(id: number) {
  //   return `This action removes a #${id} typesMeasurement`;
  // }
}
