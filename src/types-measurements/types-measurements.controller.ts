import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypesMeasurementsService } from './types-measurements.service';
import { CreateTypesMeasurementDto } from './dto/create-types-measurement.dto';
import { UpdateTypesMeasurementDto } from './dto/update-types-measurement.dto';

@Controller('types-measurements')
export class TypesMeasurementsController {
  constructor(private readonly typesMeasurementsService: TypesMeasurementsService) {}

  @Post('create')
  create(@Body() createTypesMeasurementDto: CreateTypesMeasurementDto) {
    return this.typesMeasurementsService.create(createTypesMeasurementDto);
  }

  @Get()
  findAll() {
    return this.typesMeasurementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesMeasurementsService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTypesMeasurementDto: UpdateTypesMeasurementDto) {
    return this.typesMeasurementsService.update(+id, updateTypesMeasurementDto);
  }
  //Inactivar
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.typesMeasurementsService.remove(+id);
  // }
}
