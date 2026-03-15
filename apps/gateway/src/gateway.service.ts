import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCatalogItemDto } from '@app/common';

@Injectable()
export class GatewayService {
  constructor(@Inject('CATALOG') private catalogClient: ClientProxy) {}

  getCatalogItems() {
    return this.catalogClient.send('get_catalog_items', {});
  }

  createCatalogItem(createCatalogItemDto: CreateCatalogItemDto) {
    return this.catalogClient.send('create_catalog_item', createCatalogItemDto);
  }
}
