import { Injectable } from '@nestjs/common';

import { NotesCrudService } from './notes-crud.service';

import { INotesService } from '../interfaces/notes-service.interface';

@Injectable()
export class NotesService extends NotesCrudService implements INotesService {}
