import {
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Put,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BooklistsService } from './booklists.service';
import { Booklist } from './booklist.entity';
import { CreateBooklistDto } from './dto/create-booklist.dto';
import { GetUser } from '../auth/user.decorator';
import { UpdateBooklistDto } from './dto/update-booklist.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';

@Controller('booklists')
@UseGuards(AuthGuard())
export class BooklistsController {
  constructor(private booklistsService: BooklistsService) {}

  @Get()
  getAllBooks(@GetUser() user: User): Promise<Booklist[]> {
    return this.booklistsService.getAllBooklists(user);
  }

  @Get('/:id')
  getBook(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Booklist> {
    return this.booklistsService.getBooklistById(id, user);
  }

  @Delete('/:id')
  deleteBook(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.booklistsService.deleteBooklist(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBook(
    @Body() createBooklistDto: CreateBooklistDto,
    @GetUser() user: User,
  ): Promise<Booklist> {
    return this.booklistsService.createBooklist(user, createBooklistDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBooklistDto: UpdateBooklistDto,
    @GetUser() user: User,
  ): Promise<Booklist> {
    return this.booklistsService.updateBooklist(id, user, updateBooklistDto);
  }
}
