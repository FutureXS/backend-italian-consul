import { IsEmail, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import Role from '../enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
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
