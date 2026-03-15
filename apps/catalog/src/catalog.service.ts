import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCatalogItemDto } from '@app/common';
import { Item } from './entities/item.entity';

@Injectable()
export class CatalogService {
  private readonly logger = new Logger(CatalogService.name);

  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
    @Inject('SEARCH') private searchClient: ClientProxy,
  ) {}

  async create(createCatalogItemDto: CreateCatalogItemDto): Promise<Item> {
    const item = this.itemsRepository.create(createCatalogItemDto);
    await this.itemsRepository.save(item);
    this.searchClient.emit('item_created', item);
    this.logger.log(`Item created: ${item.id}`);
    return item;
  }

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }
}
