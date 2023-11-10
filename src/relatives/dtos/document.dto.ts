import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import RecordType from '../enums/record-type.enum';
import { BrideFatherDto } from './bride-father.dto';
import { BrideDto } from './bride.dto';
import { ExtraDto } from './extra.dto';
import { FatherDto } from './father.dto';
import { GroomFatherDto } from './groom-father.dto';
import { GroomMotherDto } from './groom-mother.dto';
import { GroomDto } from './groom.dto';
import { MarriageDto } from './marriage.dto';
import { MaternalGrandfatherDto } from './maternal-grandfather.dto';
import { MaternalGrandmotherDto } from './maternal-grandmother.dto';
import { MotherDto } from './mother.dto';
import { PaternalGrandfatherDto } from './paternal-grandfather.dto';
import { PaternalGrandmotherDto } from './paternal-grandmother.dto';
import { RegisteredPersonDto } from './registered-person.dto';
import { BrideMotherDto } from './bride-mother.dto';

export class DocumentDto {
  type?: RecordType;

  @Type(() => RegisteredPersonDto)
  @ValidateNested()
  registered_person?: RegisteredPersonDto;

  // registration_data: RegistrationDto;

  @Type(() => FatherDto)
  @ValidateNested()
  father_data?: FatherDto;

  @Type(() => MotherDto)
  @ValidateNested()
  mother_data?: MotherDto;

  @Type(() => PaternalGrandfatherDto)
  @ValidateNested()
  paternal_grandfather_data?: PaternalGrandfatherDto;

  @Type(() => PaternalGrandmotherDto)
  @ValidateNested()
  paternal_grandmother_data?: PaternalGrandmotherDto;

  @Type(() => MaternalGrandfatherDto)
  @ValidateNested()
  maternal_grandfather_data?: MaternalGrandfatherDto;

  @Type(() => MaternalGrandmotherDto)
  @ValidateNested()
  maternal_grandmother_data?: MaternalGrandmotherDto;

  @Type(() => ExtraDto)
  @ValidateNested()
  extra_data?: ExtraDto;

  @Type(() => MarriageDto)
  @ValidateNested()
  marriage_data?: MarriageDto;

  @Type(() => GroomDto)
  @ValidateNested()
  groom_data?: GroomDto;

  @Type(() => GroomFatherDto)
  @ValidateNested()
  groom_father_data?: GroomFatherDto;

  @Type(() => GroomMotherDto)
  @ValidateNested()
  groom_mother_data?: GroomMotherDto;

  @Type(() => BrideDto)
  @ValidateNested()
  bride_data?: BrideDto;

  @Type(() => BrideFatherDto)
  @ValidateNested()
  bride_father_data?: BrideFatherDto;

  @Type(() => BrideMotherDto)
  @ValidateNested()
  bride_mother_data?: BrideMotherDto;
}
