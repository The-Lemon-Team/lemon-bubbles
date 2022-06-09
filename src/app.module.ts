import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HashtagModule } from './hashtag/hashtag.module';
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    HashtagModule,
    NotesModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
