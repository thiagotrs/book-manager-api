import { MinLength, IsOptional } from 'class-validator';

export class UpdateGenreDto {
  @IsOptional()
  @MinLength(2)
  name: string;
}
