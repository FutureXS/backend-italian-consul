import { IsDateString, IsNotEmpty } from 'class-validator';

export class RegisteredPersonDto {
  first_name?: string;
  last_name?: string;
  birth_date?: Date;
  city?: string;
  state?: string;
  country?: string;
}
