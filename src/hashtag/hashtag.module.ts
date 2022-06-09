import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hashtag } from './entities/hashtag.entity';
import { HashtagService } from './services/hashtag.service';
import { HashtagController } from './hashtag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  controllers: [HashtagController],
  providers: [HashtagService],
  exports: [HashtagService],
})
export class HashtagModule {}
