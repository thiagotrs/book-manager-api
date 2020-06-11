import { Module } from '@nestjs/common';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';
import { Publisher } from './publisher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publisher]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}
