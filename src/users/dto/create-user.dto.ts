import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of creation user',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 40)
  login: string;

  @ApiProperty({
    description: 'Password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  password: string;

  @ApiProperty({
    description: 'Email',
    example: 'some_example_of_lemon_bubbles_backend@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
