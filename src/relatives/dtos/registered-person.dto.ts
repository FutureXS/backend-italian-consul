import { IsDateString, IsNotEmpty } from 'class-validator';

export class RegisteredPersonDto {
  @IsNotEmpty({
    message: 'First name is required',
  })
  first_name: string;

  @IsNotEmpty({
    message: 'Last name is required',
  })
  last_name: string;

  @IsNotEmpty({
    message: 'Birth date is required',
  })
  @IsDateString(undefined, {
    message: 'Birth date must be a date',
  })
  birth_date: Date;

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
