import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateCatalogItemDto } from '@app/common';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('catalog')
  async getCatalogItems() {
    return this.gatewayService.getCatalogItems();
  }

  @Post('catalog')
  createCatalogItem(@Body() createCatalogItemDto: CreateCatalogItemDto) {
    return this.gatewayService.createCatalogItem(createCatalogItemDto);
  }
}
