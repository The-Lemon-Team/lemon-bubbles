import { CreateNoteDto } from '../dto/create-note.dto';

import { INote } from '../../interfaces';
import { ICrudService } from '../../interfaces/crud-services.interface';

export interface INotesCrudService extends ICrudService<INote, CreateNoteDto> {}
