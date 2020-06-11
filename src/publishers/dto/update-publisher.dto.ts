import { MinLength, IsOptional } from 'class-validator';

export class UpdatePublisherDto {
  @IsOptional()
  @MinLength(2)
  name: string;
}
