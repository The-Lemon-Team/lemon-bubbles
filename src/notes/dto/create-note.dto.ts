import { Length, IsNotEmpty, IsString, IsArray } from 'class-validator';

import { Hashtag } from '../../hashtag';

import { INote } from '../../interfaces';

export class CreateNoteDto implements Omit<INote, 'id' | 'created'> {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  readonly description: string;

  @IsArray({
    each: true,
  })
  readonly hashtags: Hashtag[];
}
