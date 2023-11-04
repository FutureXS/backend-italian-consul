import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

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
    message: 'Last name is required',
  })
  age_death: string;

  @IsNotEmpty({
    message: 'Nationality is required',
  })
  nationality: string;
}
