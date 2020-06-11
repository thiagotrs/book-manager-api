import { IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from 'src/auth/user-roles.enum';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(2)
  firstname: string;

  @IsOptional()
  @MinLength(2)
  lastname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(10)
  pass: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
