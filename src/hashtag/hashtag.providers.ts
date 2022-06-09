import { Connection } from 'typeorm';

import { RepositoryEnum, ProviderEnum } from '../enums';
import { Hashtag } from './entities/hashtag.entity';

export const hashtagProviders = [
  {
    provide: RepositoryEnum.HashTagRepository,
    useFactory: (connection: Connection) => connection.getRepository(Hashtag),
    inject: [ProviderEnum.DatabaseConnection],
  },
];
