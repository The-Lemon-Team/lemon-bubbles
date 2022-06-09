import { Module } from '@nestjs/common';

import { HashtagService } from './services/hashtag.service';
import { HashtagController } from './hashtag.controller';
import { hashtagProviders } from './hashtag.providers';
import { DatabaseModule } from '../database';

@Module({
  imports: [DatabaseModule],
  controllers: [HashtagController],
  providers: [...hashtagProviders, HashtagService],
  exports: [HashtagService],
})
export class HashtagModule {}
