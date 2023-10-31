import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { File } from 'buffer';
import { HydratedDocument, Types } from 'mongoose';
import { Applicant } from 'src/applicants/schemas/applicant.schema';
import RecordType from 'src/relatives/enums/record-type.enum';

export type DocumentDocument = HydratedDocument<Document>;

@Schema()
export class Document {
  @Prop({
    required: true,
    type: Types.Map,
  })
  file: File;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Applicant',
  })
  applicant: Applicant;

  @Prop({
    required: false,
    type: Types.ObjectId,
    ref: 'Relative',
  })
  relative: string;

  @Prop({
    required: true,
  })
  type: RecordType;

  @Prop({
    required: false,
    type: Types.Map,
  })
  registered_person: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    city: string;
    state: string;
    country: string;
  };

  // @Prop({
  //   required: false,
  // })
  // registration_data: any;

  @Prop({
    required: false,
    type: Types.Map,
  })
  father_data: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    age: number;
    city: string;
    state: string;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  mother_data: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    age: number;
    city: string;
    state: string;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  paternal_grandfather_data: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    is_alive: boolean;
    death_date: Date;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  paternal_grandmother_data: {
    first_name: string;
    last_name: string;
    is_alive: boolean;
    death_date: Date;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  maternal_grandfather_data: {
    first_name: string;
    last_name: string;
    is_alive: boolean;
    death_date: Date;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  maternal_grandmother_data: {
    first_name: string;
    last_name: string;
    is_alive: boolean;
    death_date: Date;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  extra_data: {
    marital_status: string;
    spouses_name: string;
    list_of_children: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  marriage_data: {
    type: string;
    marriage_date: Date;
    city: string;
    state: string;
    country: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  groom_data: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    age: number;
    city: string;
    state: string;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  groom_father_data: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    age: number;
    city: string;
    state: string;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  groom_mother_data: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    age: number;
    city: string;
    state: string;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  bride_data: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    age: number;
    city: string;
    state: string;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  bride_father_data: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    age: number;
    city: string;
    state: string;
    nationality: string;
  };

  @Prop({
    required: false,
    type: Types.Map,
  })
  bride_mother_data: {
    first_name: string;
    last_name: string;
    birth_date: Date;
    age: number;
    city: string;
    state: string;
    nationality: string;
  };

  @Prop({
    default: Date.now(),
  })
  created_at: Date;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
