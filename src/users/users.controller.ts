import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  @ApiResponse({
    status: 200,
    type: User,
    description: 'A point to create a new user',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return this.usersService.create(createUserDto);
  }

  // @Get('/:login')
  // @ApiResponse({
  //   status: 200,
  //   type: User,
  //   description: 'A point to get account by login',
  // })
  // @UseInterceptors(ClassSerializerInterceptor)
  // async findByLogin(@Param('login') login: string) {
  //   return this.usersService.findUserByLogin({ login });
  // }

  @Get()
  @ApiResponse({
    status: 200,
    isArray: true,
    type: User,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.findAllUsers();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
