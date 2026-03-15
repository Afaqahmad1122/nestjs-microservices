import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import * as Joi from 'joi';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_SEARCH_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
