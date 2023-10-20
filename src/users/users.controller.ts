import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() userDto: UserDto) {
    try {
      return await this.usersService.create(userDto);
    } catch (e) {
      throw e;
    }
  }
}
