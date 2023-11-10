import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PaternalGrandmotherDto {
  first_name?: string;
  last_name?: string;
  age_death?: string;
  nationality?: string;
}
