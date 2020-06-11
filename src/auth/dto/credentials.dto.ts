import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  pass: string;
}
