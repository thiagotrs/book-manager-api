import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Booklist } from './booklist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBooklistDto } from './dto/create-booklist.dto';
import { UpdateBooklistDto } from './dto/update-booklist.dto';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class BooklistsService {
  constructor(
    @InjectRepository(Booklist)
    private booklistRepository: Repository<Booklist>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getAllBooklists(user: User): Promise<Booklist[]> {
    return await this.booklistRepository.find({
      where: { userId: user.id },
      select: ['id', 'name'],
    });
  }

  async getBooklistById(id: number, user: User): Promise<Booklist> {
    try {
      return await this.booklistRepository.findOneOrFail(id, {
        where: { userId: user.id },
        relations: ['books'],
        select: ['id', 'name'],
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteBooklist(id: number, user: User): Promise<void> {
    const { affected } = await this.booklistRepository.delete({
      id,
      userId: user.id,
    });
    console.log(affected);
    if (!affected) {
      throw new NotFoundException();
    }
  }

  async createBooklist(
    user: User,
    createBooklist: CreateBooklistDto,
  ): Promise<Booklist> {
    try {
      const booklist = await this.booklistRepository.save({
        ...createBooklist,
        user,
      });
      delete booklist.user;
      delete booklist.userId;
      return booklist;
    } catch (error) {
      throw new BadRequestException('Booklist already exists.');
    }
  }

  async updateBooklist(
    id: number,
    user: User,
    updateBooklistDto: UpdateBooklistDto,
  ): Promise<Booklist> {
    await this.getBooklistById(id, user);
    try {
      const booklist = new Booklist();
      booklist.id = id;
      if (booklist.name) {
        booklist.name = updateBooklistDto.name;
      }
      if (updateBooklistDto.books) {
        booklist.books = await this.mapToEntities(
          updateBooklistDto.books,
          this.bookRepository,
        );
      }
      return await this.booklistRepository.save(booklist);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async mapToEntities(
    listIds: number[],
    repository: Repository<any>,
  ): Promise<Array<any>> {
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
