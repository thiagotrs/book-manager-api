import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBooklistDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
