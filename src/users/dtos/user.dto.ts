import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import Role from '../enums/role.enum';

export class UserDto {
  @IsOptional()
  name: string;

  @IsEmail(undefined, {
    message: 'E-mail must be valid.',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required.',
  })
  password: string;

  @IsOptional()
  role: Role;
}
