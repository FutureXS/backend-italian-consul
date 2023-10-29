import { IsNotEmpty } from 'class-validator';

export class ExtraDto {
  @IsNotEmpty({
    message: 'Marital status is required',
  })
  marital_status: string;

  @IsNotEmpty({
    message: "Spouse's name is required",
  })
  spouses_name: string;

  @IsNotEmpty({
    message: 'List of children is required',
  })
  list_of_children: string;
}
