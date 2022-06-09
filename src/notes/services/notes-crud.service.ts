import { Repository } from 'typeorm';

import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

import { INote } from '../../interfaces';
import { INotesCrudService } from '../interfaces/notes-crud-service.interface';

export class NotesCrudService implements INotesCrudService {
  constructor(public readonly notesRepository: Repository<INote>) {}

  create(payload: CreateNoteDto) {
    const newHashTag = this.notesRepository.create(payload);

    return this.notesRepository.save(newHashTag);
  }

  findAll() {
    return this.notesRepository.find();
  }

  findOne(id: string) {
    return this.notesRepository.findOne(id);
  }

  update(id: string, updatePayload: UpdateNoteDto) {
    return this.notesRepository.save({ id, ...updatePayload });
  }

  async remove(id: string) {
    await this.notesRepository.delete(id);

    return true;
  }
}
