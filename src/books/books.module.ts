import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/authors/author.entity';
import { Publisher } from 'src/publishers/publisher.entity';
import { Genre } from 'src/genres/genre.entity';
import { MulterModule } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from './file-upload.utils';
import { diskStorage } from 'multer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author, Publisher, Genre]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
