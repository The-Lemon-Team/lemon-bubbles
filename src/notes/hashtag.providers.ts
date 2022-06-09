import { Connection } from 'typeorm';

import { RepositoryEnum, ProviderEnum } from '../enums';
import { Note } from './entities/note.entity';

export const notesProviders = [
  {
    provide: RepositoryEnum.NotesRepository,
    useFactory: (connection: Connection) => connection.getRepository(Note),
    inject: [ProviderEnum.DatabaseConnection],
  },
];
