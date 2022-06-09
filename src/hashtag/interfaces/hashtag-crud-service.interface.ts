import { CreateHashtagDto } from '../dto/create-hashtag.dto';

import { ICrudService, IHashtag } from '../../interfaces';

export interface IHashtagCrudService
  extends ICrudService<IHashtag, CreateHashtagDto> {}
