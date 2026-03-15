import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { SearchModule } from './search.module';

async function bootstrap() {
  const app = await NestFactory.create(SearchModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('SEARCH'));
  await app.startAllMicroservices();
}
void bootstrap();
