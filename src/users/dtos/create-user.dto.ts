import { IsEmail, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import Role from '../enums/role.enum';

export class CreateUserDto {
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
  @IsIn([Role.ADMIN, Role.USER], {
    message: `Role must be ${Role.ADMIN} or ${Role.USER}.`,
  })
  role: Role;
}
