import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  indexItem(data: any) {
    this.logger.log('Indexing item...', data);
  }
}
