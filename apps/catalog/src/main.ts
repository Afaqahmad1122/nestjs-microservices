import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CatalogModule);

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('CATALOG'));

  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
}
void bootstrap();
