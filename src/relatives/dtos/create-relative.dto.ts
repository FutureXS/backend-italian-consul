import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import Gender from '../enums/gender.enum';
import { DocumentDto } from './document.dto';
import { Type } from 'class-transformer';

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
  relatives: string;

  @Type(() => DocumentDto)
  @ValidateNested({
    each: true,
  })
  @ArrayMaxSize(3, {
    message: 'Documents must be less than 3',
  })
  @ArrayMinSize(3, {
    message: 'Documents must be at least 3',
  })
  @IsArray({
    message: 'Documents must be an array',
  })
  documents_data: DocumentDto[];
}
