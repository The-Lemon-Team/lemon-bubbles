import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Length(4, 40, {
    message: 'The login must be at least 4 but not longer than 30 characters',
  })
  @Column({ unique: true })
  login: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  public refreshToken?: string;

  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'The password is required' })
  @Exclude()
  @Column()
  public password: string;

  @Column()
  @IsEmail({}, { message: 'Incorrect email' })
  public email: string;
}
