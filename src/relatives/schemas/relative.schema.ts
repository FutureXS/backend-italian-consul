import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Applicant } from 'src/applicants/schemas/applicant.schema';
import Gender from '../enums/gender.enum';

export type RelativeDocument = HydratedDocument<Relative>;

@Schema()
export class Relative {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    default: Gender.MALE,
  })
  gender: Gender;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: false,
  })
  photo: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Applicant',
  })
  applicant: Applicant;

  @Prop({
    required: false,
    type: [Types.ObjectId],
    ref: 'Relative',
  })
  relatives: Relative[];

  @Prop({
    required: false,
    type: Types.ObjectId,
    ref: 'Relative',
  })
  father: Relative;

  @Prop({
    required: false,
    type: Types.ObjectId,
    ref: 'Relative',
  })
  mother: Relative;

  @Prop({
    required: true,
    type: Types.Map,
  })
  documents_data: any;

  @Prop({
    required: true,
    type: Types.Map,
  })
  birth_document: File;

  @Prop({
    required: true,
    type: Types.Map,
  })
  wedding_document: File;

  @Prop({
    required: true,
    type: Types.Map,
  })
  death_document: File;

  @Prop({
    default: Date.now(),
  })
  created_at: Date;
}

export const RelativeSchema = SchemaFactory.createForClass(Relative);
