import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    const result = bcrypt.compareSync(password, user?.password);

    if (result) {
      return {
        accessToken: await this.jwtService.signAsync({
          sub: user?.id,
          email: user?.email,
        }),
      };
    }

    throw new UnauthorizedException();
  }
}
