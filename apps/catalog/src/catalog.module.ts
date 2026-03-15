import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, RmqModule } from '@app/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { Item } from './entities/item.entity';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_CATALOG_QUEUE: Joi.string().required(),
        RABBIT_MQ_SEARCH_QUEUE: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    DatabaseModule, // Connect to Database
    TypeOrmModule.forFeature([Item]), // Register Item entity for this module
    RmqModule,
    RmqModule.register({ name: 'SEARCH' }),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
