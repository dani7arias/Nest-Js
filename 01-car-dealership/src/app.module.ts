import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { SeedModule } from './seed/seed.module';
import { AppController } from './app.controller';

@Module({
  imports: [CarsModule, BrandsModule, SeedModule],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
