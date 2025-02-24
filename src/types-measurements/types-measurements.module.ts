import { Module } from '@nestjs/common';
import { TypesMeasurementsService } from './types-measurements.service';
import { TypesMeasurementsController } from './types-measurements.controller';

@Module({
  controllers: [TypesMeasurementsController],
  providers: [TypesMeasurementsService],
})
export class TypesMeasurementsModule {}
