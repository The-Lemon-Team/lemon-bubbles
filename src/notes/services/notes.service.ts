import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Note } from '../entities/note.entity';
import { NotesCrudService } from './notes-crud.service';

import { INotesService } from '../interfaces/notes-service.interface';

@Injectable()
export class NotesService extends NotesCrudService implements INotesService {
  constructor(
    @InjectRepository(Note)
    public notesRepository: Repository<Note>,
  ) {
    super(notesRepository);
  }
}
