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

  @IsBoolean({
    message: 'Is alive is required',
  })
  is_alive: boolean;

  @IsDateString(undefined, {
    message: 'Death date must be a date',
  })
  @ValidateIf((o) => !o.is_alive)
  death_date: Date;

  @IsNotEmpty({
    message: 'Nationality is required',
  })
  nationality: string;
}
