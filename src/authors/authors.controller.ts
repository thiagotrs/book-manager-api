import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './author.entity';
import { AuthorsService } from './authors.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAuthorDto } from './dto/updade-author.dto';

@Controller('authors')
@UseGuards(AuthGuard())
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  getAllAuthors(): Promise<Author[]> {
    return this.authorsService.getAllAuthors();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Get('/:id')
  getAuthor(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorsService.getAuthorById(id);
  }

  @Delete('/:id')
  deleteAuthor(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.authorsService.deleteAuthor(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.updateAuthor(id, updateAuthorDto);
  }
}
