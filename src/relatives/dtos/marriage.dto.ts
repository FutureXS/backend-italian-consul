import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import MarriageType from '../enums/marriage-type.enum';

export class MarriageDto {
  @IsIn([MarriageType.CIVIL, MarriageType.RELIGIOUS], {
    message: 'Type must be CIVIL or RELIGIOUS',
  })
  type: MarriageType;

  @IsNotEmpty({
    message: 'Marriage date is required',
  })
  @IsDateString(undefined, {
    message: 'Marriage date must be a valid date',
  })
  marriage_date: Date;

  @IsNotEmpty({
    message: 'Marriage city is required',
  })
  city: string;

  @IsNotEmpty({
    message: 'Marriage state is required',
  })
  state: string;

  @IsNotEmpty({
    message: 'Marriage country is required',
  })
  country: string;
}
