import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { NotesService } from './services/notes.service';
import { NotesController } from './notes.controller';
import { notesProviders } from './hashtag.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController],
  providers: [...notesProviders, NotesService],
  exports: [NotesService],
})
export class NotesModule {}
