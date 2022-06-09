import { Injectable } from '@nestjs/common';

import { HashtagCrudService } from './hashtag-crud.service';

import { IHashtagService } from '../interfaces/hashtag-services.interface';

@Injectable()
export class HashtagService
  extends HashtagCrudService
  implements IHashtagService {}
