import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  GoneException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoginDto } from './dto/login.dto';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CryptService } from '../crypt';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { LoginByEmailDto } from './dto/login-by-email.dto';
import { ErrorStatus } from '../enums/ErrorStatus.enum';
import { HttpException } from '../common/HttpException';

import { TokensPair } from '../interfaces/tokens-pair.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly cryptService: CryptService,
    private readonly configService: ConfigService,
  ) {}

  async signInByLogin({ login, password }: LoginDto) {
    const user = await this.userService.findUserByLogin({ login });

    return this.addRefreshToken(user, password);
  }

  async signInByEmail({ email, password }: LoginByEmailDto) {
    const user = await this.userService.findUserByEmail({ email });

    return this.addRefreshToken(user, password);
  }

  async addRefreshToken(user: User, password: string) {
    if (!user) {
      throw new HttpException(
        'Пользователь не найден',
        HttpStatus.UNAUTHORIZED,
        ErrorStatus.USER_NOT_FOUND,
      );
    }

    if (!(await this.cryptService.comparePassword(password, user.password))) {
      // console.log('пароль не вер');
      throw new HttpException(
        'Пароль не верный',
        HttpStatus.UNAUTHORIZED,
        ErrorStatus.PASSWORD,
      );
    }

    const tokens = this.cryptService.createToken(user.id);

    await this.userService.addRefreshToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async validateUser({ id }: JwtPayload): Promise<User> {
    return await this.userService.findUserById({ id });
  }

  async refreshToken({ refreshToken }: TokenRefreshDto): Promise<TokensPair> {
    const userByToken = await this.userService.findUserByRefreshToken({
      refreshToken,
    });

    if (!userByToken) {
      throw new GoneException();
    }

    const newTokenPair = this.cryptService.createToken(userByToken.id);

    await this.userService.addRefreshToken({
      userId: userByToken.id,
      refreshToken: newTokenPair.refreshToken,
    });

    return newTokenPair;
  }

  async getUserByToken(token: string): Promise<User | undefined> {
    const jwtPayload = this.cryptService.decodeToken<JwtPayload>(token);

    try {
      return await this.userService.findUserById({ id: jwtPayload.id });
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
