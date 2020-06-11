import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
