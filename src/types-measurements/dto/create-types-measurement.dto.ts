import { IsString, IsOptional } from 'class-validator';

export class CreateTypesMeasurementDto {
  @IsString()
  name: string;
}
