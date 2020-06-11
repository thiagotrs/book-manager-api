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
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './genre.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
@UseGuards(AuthGuard())
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get()
  getAllGenres(): Promise<Genre[]> {
    return this.genresService.getAllGenres();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createGenre(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.createGenre(createGenreDto);
  }

  @Get('/:id')
  getGenre(@Param('id', ParseIntPipe) id: number): Promise<Genre> {
    return this.genresService.getGenreById(id);
  }

  @Delete('/:id')
  deletegenre(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.genresService.deleteGenre(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updategenre(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genresService.updateGenre(id, updateGenreDto);
  }
}
