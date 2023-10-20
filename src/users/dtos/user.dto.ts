import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import Role from '../enums/role.enum';

export class UserDto {
  @IsOptional()
  name: string;

  @IsEmail(undefined, {
    message: 'O e-mail deve ser um endereço de e-mail válido.',
  })
  email: string;

  @IsNotEmpty({
    message: 'A senha não pode estar vazia.',
  })
  password: string;

  @IsOptional()
  role: Role;
}
