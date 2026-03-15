import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('item_created')
  async handleItemCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.searchService.indexItem(data);
    this.rmqService.ack(context);
  }
}
