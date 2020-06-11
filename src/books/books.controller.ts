import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormDataPipe } from './pipes/form-data.pipe';
import { AuthGuard } from '@nestjs/passport';
import { SearchBookDto } from './dto/search-book.dto';
import { QueryDataPipe } from './pipes/query-data.pipe';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @UsePipes(QueryDataPipe, ValidationPipe)
  getAllBooks(@Query() searchBookDto: SearchBookDto): Promise<Book[]> {
    return this.booksService.getAllBooks(searchBookDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  @UsePipes(FormDataPipe, ValidationPipe)
  createBook(
    @UploadedFile() file,
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book> {
    if (file) {
      createBookDto.cover = file.filename;
    }
    return this.booksService.createBook(createBookDto);
  }

  @Get('/:id')
  getBook(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Delete('/:id')
  deleteBook(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.booksService.deleteBook(id);
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('cover'))
  @UsePipes(FormDataPipe, ValidationPipe)
  updateBook(
    @UploadedFile() file,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    if (file) {
      updateBookDto.cover = file.filename;
    }
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Get('/cover/:imgpath')
  seeBookCover(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
