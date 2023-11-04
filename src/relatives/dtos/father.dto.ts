import { IsDateString, IsNotEmpty } from 'class-validator';

export class FatherDto {
  @IsNotEmpty({
    message: 'First name is required',
  })
  first_name: string;

  @IsNotEmpty({
    message: 'Last name is required',
  })
  last_name: string;

 

  @IsNotEmpty({
    message: 'Age is required',
  })
  age: number;

  

  @IsNotEmpty({
    message: 'Nationality is required',
  })
  nationality: string;
}
