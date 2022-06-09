import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';

import { Hashtag } from '../hashtag';
import { ProviderEnum } from '../enums';

export const databaseProviders = [
  {
    provide: ProviderEnum.DatabaseConnection,
    useFactory: async (configService: ConfigService) => {
      const host = configService.get('DB_HOST');
      const port = configService.get('DB_PORT');
      const username = configService.get('DB_USERNAME');
      const password = configService.get('DB_PASSWORD');
      const database = configService.get('DB_DATABASE');

      return await createConnection({
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: [Hashtag],
        synchronize: true,
      });
    },
    inject: [ConfigService],
  },
];
