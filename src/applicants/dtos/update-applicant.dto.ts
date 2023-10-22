import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  ValidateNested,
  IsNotEmptyObject,
  IsBoolean,
  ValidateIf,
  IsOptional,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class UpdateApplicantDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsOptional()
  name: string;

  @IsNotEmpty({
    message: 'Last name is required',
  })
  @IsOptional()
  last_name: string;

  @IsNotEmpty({
    message: 'Birthday is required',
  })
  @IsOptional()
  birthday: Date;

  @IsNotEmpty({
    message: 'Born location is required',
  })
  @IsOptional()
  born_location: string;

  @IsNotEmpty({
    message: 'Country is required',
  })
  @IsOptional()
  country: string;

  @IsNotEmpty({
    message: 'State is required',
  })
  @IsOptional()
  state: string;

  @Type(() => AddressDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Italian address is required',
  })
  @IsOptional()
  italian_address: AddressDto;

  @Type(() => AddressDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'External address is required',
  })
  @IsOptional()
  external_address: AddressDto;

  @IsBoolean({
    message: 'Has passport must be a boolean',
  })
  @IsNotEmpty({
    message: 'Has passport is required',
  })
  @IsOptional()
  has_passport: boolean;

  @IsNotEmpty({
    message: 'Passport number is required',
  })
  @ValidateIf((o) => o?.has_passport === true)
  @IsOptional()
  passport_number: string;

  @IsNotEmpty({
    message: 'Passport emission date is required',
  })
  @ValidateIf((o) => o?.has_passport === true)
  @IsOptional()
  passport_emission_date: Date;

  @IsNotEmpty({
    message: 'CPF is required',
  })
  @IsOptional()
  cpf: string;

  @IsNotEmpty({
    message: 'RG is required',
  })
  @IsOptional()
  rg: string;

  @IsNotEmpty({
    message: 'RG emission date is required',
  })
  @IsOptional()
  rg_emission_date: Date;
}
