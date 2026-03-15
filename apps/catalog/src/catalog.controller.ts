import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CatalogService } from './catalog.service';
import { CreateCatalogItemDto, RmqService } from '@app/common';
import { Item } from './entities/item.entity';

@Controller()
export class CatalogController {
  constructor(
    private readonly catalogService: CatalogService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern('get_catalog_items')
  async findAll(@Ctx() context: RmqContext) {
    const items = await this.catalogService.findAll();
    this.rmqService.ack(context);
    return items;
  }

  @MessagePattern('create_catalog_item')
  async create(
    @Payload() createCatalogItemDto: CreateCatalogItemDto,
    @Ctx() context: RmqContext,
  ) {
    const item: Item = await this.catalogService.create(createCatalogItemDto);
    this.rmqService.ack(context);
    return item;
  }
}
