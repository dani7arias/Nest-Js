import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  //Obtener todos los cars
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  //Obtener un solo car
  @Get(':id')
  getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.carsService.findOneById(id);
  }

  //Actualizar
  @Patch(':id')
  updateCar(
    @Body() updateCarDto: UpdateCarDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  //Crear
  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  //Eliminar
  @Delete(':id')
  deleteCar(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.carsService.delete(id);
  }
}
