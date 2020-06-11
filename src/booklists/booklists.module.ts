import { Module } from '@nestjs/common';
import { BooklistsController } from './booklists.controller';
import { BooklistsService } from './booklists.service';
import { Booklist } from './booklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booklist, Book]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BooklistsController],
  providers: [BooklistsService],
})
export class BooklistsModule {}
