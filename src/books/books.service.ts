import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Publisher } from 'src/publishers/publisher.entity';
import { Genre } from 'src/genres/genre.entity';
import { Author } from 'src/authors/author.entity';
import { SearchBookDto } from './dto/search-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async getAllBooks(searchBookDto: SearchBookDto): Promise<Book[]> {
    if (Object.entries(searchBookDto).length) {
      const { title, isbn, publisher, authors, genres } = searchBookDto;
      return await this.bookRepository
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.publisher', 'publisher')
        .leftJoinAndSelect('book.authors', 'author')
        .leftJoinAndSelect('book.genres', 'genre')
        .orWhere('book.title = :title', { title })
        .orWhere('book.isbn = :isbn', { isbn })
        .orWhere('publisher.id = :publisher', { publisher })
        .orWhere('author.id IN (:...authors)', { authors })
        .orWhere('genre.id IN (:...genres)', { genres })
        .getMany();
    }
    return await this.bookRepository.find();
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.setEntity<Book>(createBookDto, Book);
    try {
      return await this.bookRepository.save(book);
    } catch (error) {
      throw new BadRequestException('Book already exists.');
    }
  }

  async getBookById(id: number): Promise<Book> {
    try {
      return await this.bookRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteBook(id: number): Promise<void> {
    const { affected } = await this.bookRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.getBookById(id);
    try {
      const book = await this.setEntity<Book>(updateBookDto, Book);
      return await this.bookRepository.save({ ...book, id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async setEntity<T extends object>(
    dto: any,
    et: new () => T,
  ): Promise<T> {
    const entity = new et();
    for (const prop in dto) {
      entity[prop] = dto[prop];
    }
    try {
      if ('publisher' in entity) {
        (entity as Book).publisher = await this.publisherRepository.findOneOrFail(
          dto.publisher,
        );
      }
      if ('authors' in entity) {
        (entity as Book).authors = await this.mapToEntities<Author>(
          dto.authors,
          this.authorRepository,
        );
      }
      if ('genres' in entity) {
        (entity as Book).genres = await this.mapToEntities<Genre>(
          dto.genres,
          this.genreRepository,
        );
      }
      return entity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async mapToEntities<T>(
    listIds: number[],
    repository: Repository<T>,
  ): Promise<Array<T>> {
    return Promise.all(
      listIds.map(async id => {
        try {
          return await repository.findOneOrFail(id);
        } catch (error) {
          throw new BadRequestException(
            `${repository.metadata.tableName.toLocaleUpperCase()} Id ${id} is not found.`,
          );
        }
      }),
    );
  }
}
