import { Length, IsNotEmpty, IsString } from 'class-validator';

import { IHashtag } from '../../interfaces';

export class CreateHashtagDto implements Omit<IHashtag, 'id'> {
  @IsNotEmpty()
  @IsString()
  @Length(1, 80)
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  readonly created: string;
}
