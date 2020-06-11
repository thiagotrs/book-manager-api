import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-roles.enum';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.checkCredentials(credentialsDto);
    if (user === null) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = await this.jwtService.sign({
      id: user.id,
      name: `${user.firstname} ${user.lastname}`,
      role: user.role,
    });
    return { accessToken };
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    try {
      const encriptedPass = await bcrypt.hash(createUserDto.pass, 10);
      const user = await this.userRepository.save({
        ...createUserDto,
        role: UserRole.USER,
        pass: encriptedPass,
      });
      delete user.pass;
      return user;
    } catch (error) {
      throw new BadRequestException('User already exists.');
    }
  }

  private async checkCredentials(
    credentialsDto: CredentialsDto,
  ): Promise<User> {
    const { email, pass } = credentialsDto;
    const user = await this.userRepository.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.pass))) {
      return user;
    } else {
      return null;
    }
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      if (updateUserDto.pass) {
        updateUserDto.pass = await bcrypt.hash(updateUserDto.pass, 10);
      }
      const userUpdated = await this.userRepository.save({
        ...updateUserDto,
        id: user.id,
      });
      delete userUpdated.pass;
      return userUpdated;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
