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
  name?: string;
  gender?: Gender;
  photo?: string;
  applicant?: string;
  mother?: string;
  father?: string;
  relatives?: string[];
  documents_data?: DocumentDto[];
}
