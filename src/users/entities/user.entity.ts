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
    message: 'Логин должен быть не менее 4, но не длиннее 30 символов',
  })
  @Column({ unique: true })
  login: string;

  @Exclude()
  @Column({
    nullable: true,
  })
  public refreshToken?: string;

  @Length(6, 30, {
    message: 'Пароль должен быть не менее 6, но не длиннее 30 символов',
  })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  @Exclude()
  @Column()
  public password: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  public email: string;
}
