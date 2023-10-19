import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public async findOne(email: string) {
    email = 'victornogu80@gmail.com';

    return {
      id: 1,
      email,
      password: '123456',
    };
  }
}
