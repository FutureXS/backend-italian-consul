import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail(undefined, {
    message: 'O e-mail deve ser um endereço de e-mail válido.',
  })
  email: string;

  @IsNotEmpty({
    message: 'A senha não pode estar vazia.',
  })
  password: string;
}
