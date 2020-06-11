import {
  IsISBN,
  IsOptional,
  MinLength,
  IsInt,
  ArrayUnique,
} from 'class-validator';

export class SearchBookDto {
  @IsOptional()
  @MinLength(2)
  title: string;

  @IsOptional()
  @IsISBN()
  isbn: string;

  @IsOptional()
  @IsInt()
  publisher: number;

  @IsOptional()
  @ArrayUnique()
  authors: number[];

  @IsOptional()
  @ArrayUnique()
  genres: number[];
}
