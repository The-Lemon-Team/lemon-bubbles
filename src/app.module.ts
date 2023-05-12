import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HashtagModule } from './hashtag/hashtag.module';
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CryptModule } from './crypt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    HashtagModule,
    NotesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    CryptModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
