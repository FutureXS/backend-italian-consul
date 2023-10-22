import { File } from 'buffer';
import { IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty({
    message: 'Applicant is required',
  })
  applicant: string;
}
