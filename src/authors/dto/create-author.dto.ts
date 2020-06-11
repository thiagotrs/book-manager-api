import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
