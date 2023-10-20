import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async signIn(@Body() signInDto: SignInDto) {
    try {
      return await this.authService.signIn(signInDto.email, signInDto.password);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() request) {
    return request.user;
  }
}
