import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PaternalGrandfatherDto {
  first_name?: string;
  last_name?: string;
  age_death?: string;
  nationality?: string;
}
