import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { Type } from 'class-transformer';

export class CreateApplicantDto {
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
  birthday: Date;

  @IsNotEmpty({
    message: 'Born location is required',
  })
  born_location: string;

  @IsNotEmpty({
    message: 'Country is required',
  })
  country: string;

  @IsNotEmpty({
    message: 'State is required',
  })
  state: string;

  @Type(() => AddressDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Italian address is required',
  })
  italian_address: AddressDto;

  @Type(() => AddressDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'External address is required',
  })
  external_address: AddressDto;

  @IsBoolean({
    message: 'Has passport must be a boolean',
  })
  @IsNotEmpty({
    message: 'Has passport is required',
  })
  has_passport: boolean;

  @IsNotEmpty({
    message: 'Passport number is required',
  })
  @ValidateIf((o) => o?.has_passport === true)
  passport_number: string;

  @IsNotEmpty({
    message: 'Passport emission date is required',
  })
  @ValidateIf((o) => o?.has_passport === true)
  @IsDateString(undefined, {
    message: 'Passport emission date must be a date',
  })
  passport_emission_date: Date;

  @IsNotEmpty({
    message: 'CPF is required',
  })
  cpf: string;

  @IsNotEmpty({
    message: 'RG is required',
  })
  rg: string;

  @IsNotEmpty({
    message: 'RG emission date is required',
  })
  rg_emission_date: Date;
}
