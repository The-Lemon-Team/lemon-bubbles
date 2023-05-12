import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common/pipes';

import { AppModule } from './app.module';
import { initSwagger } from './initSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.setGlobalPrefix('api');
  initSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
