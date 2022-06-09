import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IHashtag } from '../../interfaces';

@Entity()
export class Hashtag implements IHashtag {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 80,
  })
  text: string;

  @CreateDateColumn()
  created: string;
}
