import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import Gender from '../enums/gender.enum';

export class CreateRelativeDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsIn([Gender.MALE, Gender.FEMALE], {
    message: 'Gender must be MALE or FEMALE',
  })
  @IsNotEmpty({
    message: 'Gender is required',
  })
  gender: Gender;

  @IsNotEmpty({
    message: 'Phone is required',
  })
  phone: string;

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(undefined, {
    message: 'Email is invalid',
  })
  email: string;

  @IsUrl(undefined, {
    message: 'Photo is invalid',
  })
  @IsOptional()
  photo: string;

  @IsNotEmpty({
    message: 'Applicant is required',
  })
  applicant: string;

  @IsOptional()
  @IsString({
    message: 'Mother must be a string',
  })
  mother: string;

  @IsOptional()
  @IsString({
    message: 'Father must be a string',
  })
  father: string;

  @IsOptional()
  @IsString({
    message: 'Relatives must be an array of strings',
    each: true,
  })
  relatives: string[];
}
