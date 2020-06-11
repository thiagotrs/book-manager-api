import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { Publisher } from './publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@Controller('publishers')
@UseGuards(AuthGuard())
export class PublishersController {
  constructor(private publishersService: PublishersService) {}

  @Get()
  getAllPublishers(): Promise<Publisher[]> {
    return this.publishersService.getAllPublishers();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPublisher(
    @Body() createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    return this.publishersService.createPublisher(createPublisherDto);
  }

  @Get('/:id')
  getPublisher(@Param('id', ParseIntPipe) id: number): Promise<Publisher> {
    return this.publishersService.getPublisherById(id);
  }

  @Delete('/:id')
  deletePublisher(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.publishersService.deletePublisher(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updatePublisher(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ): Promise<Publisher> {
    return this.publishersService.updatePublisher(id, updatePublisherDto);
  }
}
