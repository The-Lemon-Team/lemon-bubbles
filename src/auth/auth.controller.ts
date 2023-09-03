import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ExtractJwt } from 'passport-jwt';

import { AuthService } from './auth.service';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { LoginDto } from './dto/login.dto';
import { LoginByEmailDto } from './dto/login-by-email.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signInByLogin')
  @UseInterceptors(ClassSerializerInterceptor)
  async loginHandler(@Body() loginPayload: LoginDto) {
    return this.authService.signInByLogin(loginPayload);
  }

  @Post('/signInByEmail')
  @UseInterceptors(ClassSerializerInterceptor)
  async loginEmailHandler(@Body() loginPayload: LoginByEmailDto) {
    return this.authService.signInByEmail(loginPayload);
  }

  @Post('/refreshToken')
  async refreshHandler(@Body() refreshPayload: TokenRefreshDto) {
    return this.authService.refreshToken(refreshPayload);
  }

  @Get('/userByToken')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser(@Req() request: Request) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    return this.authService.getUserByToken(token);
  }
}
