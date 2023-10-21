import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail(undefined, {
    message: 'E-mail must be valid.',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required.',
  })
  password: string;
}
