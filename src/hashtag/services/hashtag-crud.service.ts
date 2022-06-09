import { Repository } from 'typeorm';

import { CreateHashtagDto } from '../dto/create-hashtag.dto';
import { UpdateHashtagDto } from '../dto/update-hashtag.dto';

import { IHashtag } from '../../interfaces';
import { IHashtagCrudService } from '../interfaces/hashtag-crud-service.interface';

export class HashtagCrudService implements IHashtagCrudService {
  constructor(public readonly hashtagRepository: Repository<IHashtag>) {}

  create(payload: CreateHashtagDto) {
    const newHashTag = this.hashtagRepository.create(payload);

    return this.hashtagRepository.save(newHashTag);
  }

  findAll() {
    return this.hashtagRepository.find();
  }

  findOne(id: string) {
    return this.hashtagRepository.findOne(id);
  }

  update(id: string, updatePayload: UpdateHashtagDto) {
    return this.hashtagRepository.save({ id, ...updatePayload });
  }

  async remove(id: string) {
    await this.hashtagRepository.delete(id);

    return true;
  }
}
