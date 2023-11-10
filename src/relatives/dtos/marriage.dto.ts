import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import MarriageType from '../enums/marriage-type.enum';

export class MarriageDto {
  type?: MarriageType;
  marriage_date?: Date;
  city?: string;
  state?: string;
  country?: string;
}

export class RegisteredPersonDto {
  first_name?: string;
  last_name?: string;
}
