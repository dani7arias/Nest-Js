import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Para dejar la data que es y eliminar la data basura
      forbidNonWhitelisted: true, //Para mandar error de data que no quiero recibir
    }),
  );
  await app.listen(3000);
}
bootstrap();
