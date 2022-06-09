import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Hashtag } from 'src/hashtag/entities/hashtag.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

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
