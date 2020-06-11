import {
  IsPositive,
  IsISBN,
  IsOptional,
  IsNotEmpty,
  ArrayNotEmpty,
  MinLength,
  IsInt,
  ArrayUnique,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsOptional()
  @MinLength(2)
  subtitle: string;

  @IsNotEmpty()
  @IsInt()
  publishedAt: number;

  @IsNotEmpty()
  @IsISBN()
  isbn: string;

  @IsOptional()
  @MinLength(2)
  description: string;

  @IsOptional()
  @IsPositive()
  pages: number;

  @IsOptional()
  @IsPositive()
  edition: number;

  @IsOptional()
  @MinLength(2)
  lang: string;

  @IsOptional()
  @MinLength(5)
  cover: string;

  @IsNotEmpty()
  @IsInt()
  publisher: number;

  @ArrayNotEmpty()
  @ArrayUnique()
  authors: number[];

  @ArrayNotEmpty()
  @ArrayUnique()
  genres: number[];
}
