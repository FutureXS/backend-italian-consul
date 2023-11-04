import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PaternalGrandfatherDto {
  @IsNotEmpty({
    message: 'First name is required',
  })
  first_name: string;

  @IsNotEmpty({
    message: 'Last name is required',
  })
  last_name: string;

  @IsNotEmpty({
    message: 'Age death is required',
  })
  @IsNumberString(undefined, {
    message: 'Age death must be a number',
  })
  age_death: string;

  @IsNotEmpty({
    message: 'Nationality is required',
  })
  nationality: string;
}
