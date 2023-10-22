import { IsNotEmpty } from 'class-validator';

export class CreateApplicantDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;
}
