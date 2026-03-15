import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(CatalogModule);

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('CATALOG'));
  await app.startAllMicroservices();
}
void bootstrap();
