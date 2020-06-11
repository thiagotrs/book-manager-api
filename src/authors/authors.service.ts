import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/updade-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      return await this.authorRepository.save(createAuthorDto);
    } catch (error) {
      throw new BadRequestException('Author already exists,');
    }
  }

  async getAuthorById(id: number): Promise<Author> {
    try {
      return await this.authorRepository.findOneOrFail(id, {
        relations: ['books'],
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteAuthor(id: number): Promise<void> {
    const { affected } = await this.authorRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
  }

  async updateAuthor(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    await this.getAuthorById(id);
    try {
      return this.authorRepository.save({ ...updateAuthorDto, id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
