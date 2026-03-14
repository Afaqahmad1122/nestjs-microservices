import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  process.title = 'gateway';

  const logger = new Logger('GatewayBootstrap');
  const app = await NestFactory.create(GatewayModule);

  app.enableShutdownHooks();

  const port = process.env.GATEWAY_PORT ?? 3000;
  await app.listen(port);

  logger.log(`Gateway is listening on port ${port}`);
}

void bootstrap();
