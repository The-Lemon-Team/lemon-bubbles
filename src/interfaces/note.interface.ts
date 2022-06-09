import { IHashtag } from './hashtag.interface';

export interface INote {
  id: string;
  created: string;
  description: string;
  hashtags: IHashtag[];
}
