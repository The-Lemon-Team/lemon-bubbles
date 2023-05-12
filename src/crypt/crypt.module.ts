import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CryptService } from './crypt.service';
import { jwtConstants } from '../jwtConstants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('SECRET_KEY');

        return {
          secretOrPrivateKey: secret,
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
  ],
  providers: [CryptService],
  exports: [CryptService],
})
export class CryptModule {}
