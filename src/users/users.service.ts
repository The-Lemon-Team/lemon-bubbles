import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CryptService } from '../crypt';
import { HttpException } from '../common/HttpException';

import {
  AddRefreshTokenDto,
  CreateUserDto,
  FindUserByIdDto,
  FindUserByLoginDto,
  FindUserByRefreshTokenDto,
  FindUserByEmailDto,
} from './dto';
import { ErrorStatus } from '../enums/ErrorStatus.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly cryptService: CryptService,
  ) {}

  async createUser({
    password,
    login,
    email,
    ...createUserDto
  }: CreateUserDto) {
    try {
      const user = email
        ? await this.findUserByEmail({ email })
        : await this.findUserByLogin({ login });

      if (user) {
        throw new HttpException(
          'Такой пользователь уже сущесвует',
          HttpStatus.UNPROCESSABLE_ENTITY,
          ErrorStatus.USER_EXISTS,
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
        'Такой пользователь уже сущесвует',
        HttpStatus.UNPROCESSABLE_ENTITY,
        ErrorStatus.USER_EXISTS,
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

  findUserByEmail({ email }: FindUserByEmailDto) {
    return this.userRepository.findOne({ email });
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
