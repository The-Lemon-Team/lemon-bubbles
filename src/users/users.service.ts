import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CryptService } from '../crypt';

import {
  AddRefreshTokenDto,
  CreateUserDto,
  FindUserByIdDto,
  FindUserByLoginDto,
  FindUserByRefreshTokenDto,
} from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly cryptService: CryptService,
  ) {}

  async createUser({ password, login, ...createUserDto }: CreateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        login,
      });
      if (user) {
        throw new HttpException(
          'User is already exists',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const cryptedPassword = await this.cryptService.hashPassword(password);

      return this.userRepository.create({
        login,
        password: cryptedPassword,
        ...createUserDto,
      });
    } catch (e) {
      throw new HttpException(
        'User is already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.createUser({
      ...createUserDto,
    });

    return this.userRepository.save(user);
  }

  findAllUsers() {
    return this.userRepository.find();
  }

  findUserByLogin({ login }: FindUserByLoginDto) {
    return this.userRepository.findOne({ login });
  }

  findUserById({ id }: FindUserByIdDto): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  async addRefreshToken({
    refreshToken,
    userId,
  }: AddRefreshTokenDto): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  async findUserByRefreshToken({
    refreshToken,
  }: FindUserByRefreshTokenDto): Promise<User> {
    return this.userRepository.findOne({
      refreshToken,
    });
  }
}
