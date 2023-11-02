import { IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty({
    message: 'City is required',
  })
  city: string;

  @IsNotEmpty({
    message: 'State is required',
  })
  state: string;

  @IsNotEmpty({
    message: 'Country is required',
  })
  country: string;
}
