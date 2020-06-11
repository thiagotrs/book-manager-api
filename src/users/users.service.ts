import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserRole } from 'src/auth/user-roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'firstname', 'lastname', 'email', 'role'],
    });
  }

  async getUser(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id, {
        select: ['id', 'firstname', 'lastname', 'email', 'role'],
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteUser(id: number): Promise<void> {
    const { affected } = await this.userRepository.delete(id);
    if (!affected) {
      throw new NotFoundException();
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const encriptedPass = await bcrypt.hash(createUserDto.pass, 10);
      const user = await this.userRepository.save({
        ...createUserDto,
        role: UserRole.ADMIN,
        pass: encriptedPass,
      });
      delete user.pass;
      return user;
    } catch (error) {
      throw new BadRequestException('User already exists.');
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.getUser(id);
    try {
      if (updateUserDto.pass) {
        updateUserDto.pass = await bcrypt.hash(updateUserDto.pass, 10);
      }
      return await this.userRepository.save({
        ...updateUserDto,
        id,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
