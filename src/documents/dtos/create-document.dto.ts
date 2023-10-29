import {
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import RecordType from '../../relatives/enums/record-type.enum';
import { RegisteredPersonDto } from './registered-person.dto';
import { Type } from 'class-transformer';
// import { RegistrationDto } from './registration.dto';
import { FatherDto } from './father.dto';
import { MotherDto } from './mother.dto';
import { PaternalGrandfatherDto } from './paternal-grandfather.dto';
import { PaternalGrandmotherDto } from './paternal-grandmother.dto';
import { MaternalGrandfatherDto } from './maternal-grandfather.dto';
import { MaternalGrandmotherDto } from './maternal-grandmother.dto';
import { ExtraDto } from './extra.dto';
import { MarriageDto } from './marriage.dto';
import { BrideMotherDto } from './bride-mother.dto';
import { BrideFatherDto } from './bride-father.dto';
import { BrideDto } from './bride.dto';
import { GroomMotherDto } from './groom-mother.dto';
import { GroomFatherDto } from './groom-father.dto';
import { GroomDto } from './groom.dto';

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

  @Type(() => RegisteredPersonDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Registered person is required',
  })
  @ValidateIf((o) => o.type !== RecordType.WEDDING)
  registered_person: RegisteredPersonDto;

  // @Type(() => RegistrationDto)
  // @ValidateNested()
  // @IsNotEmptyObject(undefined, {
  //   message: 'Registration data is required',
  // })
  // registration_data: RegistrationDto;

  @Type(() => FatherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Father data is required',
  })
  @ValidateIf((o) => o.type !== RecordType.WEDDING)
  father_data: FatherDto;

  @Type(() => MotherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Mother data is required',
  })
  @ValidateIf((o) => o.type !== RecordType.WEDDING)
  mother_data: MotherDto;

  @Type(() => PaternalGrandfatherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Paternal grandfather data is required',
  })
  @ValidateIf((o) => ![RecordType.DEATH, RecordType.WEDDING].includes(o.type))
  paternal_grandfather_data: PaternalGrandfatherDto;

  @Type(() => PaternalGrandmotherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Paternal grandmother data is required',
  })
  @ValidateIf((o) => ![RecordType.DEATH, RecordType.WEDDING].includes(o.type))
  paternal_grandmother_data: PaternalGrandmotherDto;

  @Type(() => MaternalGrandfatherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Maternal grandfather data is required',
  })
  @ValidateIf((o) => ![RecordType.DEATH, RecordType.WEDDING].includes(o.type))
  maternal_grandfather_data: MaternalGrandfatherDto;

  @Type(() => MaternalGrandmotherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Maternal grandmother data is required',
  })
  @ValidateIf((o) => ![RecordType.DEATH, RecordType.WEDDING].includes(o.type))
  maternal_grandmother_data: MaternalGrandmotherDto;

  @Type(() => ExtraDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Maternal grandmother data is required',
  })
  @ValidateIf((o) => o.type === RecordType.DEATH)
  extra_data: ExtraDto;

  @Type(() => MarriageDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Marriage data is required',
  })
  @ValidateIf((o) => o.type === RecordType.WEDDING)
  marriage_data: MarriageDto;

  @Type(() => GroomDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Groom data is required',
  })
  @ValidateIf((o) => o.type === RecordType.WEDDING)
  groom_data: GroomDto;

  @Type(() => GroomFatherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Groom father data is required',
  })
  @ValidateIf((o) => o.type === RecordType.WEDDING)
  groom_father_data: GroomFatherDto;

  @Type(() => GroomMotherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Groom mother data is required',
  })
  @ValidateIf((o) => o.type === RecordType.WEDDING)
  groom_mother_data: GroomMotherDto;

  @Type(() => BrideDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Bride data is required',
  })
  @ValidateIf((o) => o.type === RecordType.WEDDING)
  bride_data: BrideDto;

  @Type(() => BrideFatherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Bride father data is required',
  })
  @ValidateIf((o) => o.type === RecordType.WEDDING)
  bride_father_data: BrideFatherDto;

  @Type(() => BrideMotherDto)
  @ValidateNested()
  @IsNotEmptyObject(undefined, {
    message: 'Bride mother data is required',
  })
  @ValidateIf((o) => o.type === RecordType.WEDDING)
  bride_mother_data: BrideMotherDto;
}
