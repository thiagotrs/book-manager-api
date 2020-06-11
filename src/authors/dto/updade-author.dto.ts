import { MinLength, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @MinLength(2)
  name: string;
}
