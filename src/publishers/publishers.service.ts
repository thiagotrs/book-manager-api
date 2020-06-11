import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publisher } from './publisher.entity';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
  ) {}

  async getAllPublishers(): Promise<Publisher[]> {
    return await this.publisherRepository.find();
  }

  async createPublisher(
    createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    try {
      return await this.publisherRepository.save(createPublisherDto);
    } catch (error) {
      throw new BadRequestException('Publisher already exists.');
    }
  }

  async getPublisherById(id: number): Promise<Publisher> {
    try {
      return await this.publisherRepository.findOneOrFail(id, {
        relations: ['books'],
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deletePublisher(id: number): Promise<void> {
    const { affected } = await this.publisherRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
  }

  async updatePublisher(
    id: number,
    updatePublisherDto: UpdatePublisherDto,
  ): Promise<Publisher> {
    await this.getPublisherById(id);
    try {
      return this.publisherRepository.save({ ...updatePublisherDto, id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
