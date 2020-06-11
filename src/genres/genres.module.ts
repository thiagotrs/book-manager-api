import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Genre]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
