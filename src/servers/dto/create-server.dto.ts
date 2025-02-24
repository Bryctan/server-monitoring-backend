import { IsString, IsBoolean, IsOptional, IsIP, IsArray, IsInt } from 'class-validator';

export class CreateServerDto {
  @IsString()
  name: string;

  @IsIP()
  ipAddress: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  typeMeasurements?: number[];
}
