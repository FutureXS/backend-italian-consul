import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class CreateRelativeDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsNotEmpty({
    message: 'Last name is required',
  })
  last_name: string;

  @IsNotEmpty({
    message: 'Birthday is required',
  })
  @IsDateString(undefined, {
    message: 'Birthday must be a date',
  })
  @IsOptional()
  birthday: Date;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    {
      message: 'Age must be a number',
    },
  )
  age: number;

  @IsNotEmpty({
    message: 'City is required',
  })
  @IsOptional()
  city: string;

  @IsNotEmpty({
    message: 'State is required',
  })
  @IsOptional()
  state: string;

  @IsNotEmpty({
    message: 'Nationality is required',
  })
  nationality: string;

  @IsBoolean({
    message: 'Is alive must be a boolean',
  })
  is_alive: boolean;

  @IsNotEmpty({
    message: 'Death date is required',
  })
  @IsDateString(undefined, {
    message: 'Death date must be a date',
  })
  @ValidateIf((o) => o?.is_alive === false)
  death_date: Date;

  @IsNotEmpty({
    message: 'Applicant is required',
  })
  applicant: string;
}
