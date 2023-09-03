import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of creation user',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  @NotContains('@', { message: "Не может быть Email'ом" })
  @Length(4, 40, { message: 'Не подходящий логин' })
  login: string;

  @ApiProperty({
    description: 'Password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  field1: string;

  @ApiProperty({
    description: 'Email',
    example: 'some_example_of_lemon_bubbles_backend@email.com',
  })
  @IsNotEmpty()
  @Length(4, 6)
  // @IsString()
  // @IsEmail()
  email: string;
}
