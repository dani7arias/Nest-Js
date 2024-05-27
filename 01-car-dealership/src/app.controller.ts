import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get()
  main(@Req() request: Request) {
    const baseUrl = request.protocol + '://' + request.get('host');
    return {
      routes: 'GET',
      cars: baseUrl + '/cars',
      brands: baseUrl + '/brands',
      seed: baseUrl + '/seed',
    };
  }
}
