import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Hashtag } from '../entities/hashtag.entity';
import { HashtagCrudService } from './hashtag-crud.service';

import { IHashtagService } from '../interfaces/hashtag-services.interface';

@Injectable()
export class HashtagService
  extends HashtagCrudService
  implements IHashtagService
{
  constructor(
    @InjectRepository(Hashtag)
    public hashtagRepository: Repository<Hashtag>,
  ) {
    super(hashtagRepository);
  }
}
