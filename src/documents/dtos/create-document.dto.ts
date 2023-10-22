import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import RecordType from '../../relatives/enums/record-type.enum';

export class CreateDocumentDto {
  @IsNotEmpty({
    message: 'Applicant is required',
  })
  applicant: string;

  @IsNotEmpty({
    message: 'Relative is required if provided',
  })
  @IsOptional()
  relative: string;

  @IsNotEmpty({
    message: 'Type is required',
  })
  @IsIn([RecordType.BIRTH, RecordType.WEDDING, RecordType.DEATH], {
    message: 'Type must be BIRTH, WEDDING or DEATH',
  })
  type: RecordType;
}
