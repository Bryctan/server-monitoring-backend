import { PartialType } from '@nestjs/mapped-types';
import { CreateTypesMeasurementDto } from './create-types-measurement.dto';

export class UpdateTypesMeasurementDto extends PartialType(CreateTypesMeasurementDto) {}
