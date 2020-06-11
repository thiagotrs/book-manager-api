import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async getAllGenres(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    try {
      return await this.genreRepository.save(createGenreDto);
    } catch (error) {
      throw new BadRequestException('Genre already exists.');
    }
  }

  async getGenreById(id: number): Promise<Genre> {
    try {
      return await this.genreRepository.findOneOrFail(id, {
        relations: ['books'],
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteGenre(id: number): Promise<void> {
    const { affected } = await this.genreRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
  }

  async updateGenre(
    id: number,
    updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    await this.getGenreById(id);
    try {
      return this.genreRepository.save({ ...updateGenreDto, id });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
