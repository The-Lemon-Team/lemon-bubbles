import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { CryptService } from './crypt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('SECRET_KEY');

        return {
          secret: secret,
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
