import { MinLength, ArrayUnique, IsOptional } from 'class-validator';

export class UpdateBooklistDto {
  @IsOptional()
  @MinLength(2)
  name: string;

  @IsOptional()
  @ArrayUnique()
  books: number[];
}
