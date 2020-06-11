import {
  IsPositive,
  IsISBN,
  IsOptional,
  MinLength,
  IsInt,
  ArrayUnique,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @MinLength(2)
  title: string;

  @IsOptional()
  @MinLength(2)
  subtitle: string;

  @IsOptional()
  @IsInt()
  publishedAt: number;

  @IsOptional()
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
