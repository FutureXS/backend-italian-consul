import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

export class PaternalGrandmotherDto {
  @IsNotEmpty({
    message: 'First name is required',
  })
  first_name: string;

  @IsNotEmpty({
    message: 'Last name is required',
  })
  last_name: string;

 

  @IsNotEmpty({
    message: 'Age death required',
  })
  age_death: Date;

  @IsNotEmpty({
    message: 'Nationality is required',
  })
  nationality: string;
}
