import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Hashtag } from '../../hashtag';
import { INote } from '../../interfaces';

@Entity()
export class Note implements INote {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created: string;

  @Column({
    length: 250,
  })
  description: string;

  @ManyToMany(() => Hashtag, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  hashtags: Hashtag[];
}
