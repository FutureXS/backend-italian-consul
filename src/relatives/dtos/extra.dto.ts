import { IsNotEmpty } from 'class-validator';

export class ExtraDto {
  marital_status?: string;
  spouses_name?: string;
  list_of_children?: string;
}
