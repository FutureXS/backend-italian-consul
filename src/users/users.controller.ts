import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import Role from './enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAll(@Query('skip') skip = 0, @Query('limit') limit = 10) {
    try {
      return await this.usersService.getAll(skip, limit);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() userDto: CreateUserDto) {
    try {
      return await this.usersService.create(userDto);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, userDto);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    try {
      return await this.usersService.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
