import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  process.title = 'gateway';

  const logger = new Logger('GatewayBootstrap');
  const app = await NestFactory.create(GatewayModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  const port = configService.get<number>('PORT');
  await app.listen(port ?? 3000);

  logger.log(`Gateway is listening on port ${port}`);
}

void bootstrap();
