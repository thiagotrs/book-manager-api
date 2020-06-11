import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
