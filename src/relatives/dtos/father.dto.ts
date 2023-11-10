import { IsNotEmpty } from 'class-validator';

export class FatherDto {
  first_name?: string;
  last_name?: string;
  age?: number;
  nationality?: string;
}
