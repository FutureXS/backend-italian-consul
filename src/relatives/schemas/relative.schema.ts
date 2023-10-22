import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Applicant } from 'src/applicants/schemas/applicant.schema';

export type RelativeDocument = HydratedDocument<Relative>;

@Schema()
export class Relative {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  last_name: string;

  @Prop({
    required: false,
  })
  birthday: Date;

  @Prop({
    required: true,
  })
  age: number;

  @Prop({
    required: false,
  })
  city: string;

  @Prop({
    required: false,
  })
  state: string;

  @Prop({
    required: true,
  })
  nationality: string;

  @Prop({
    required: true,
  })
  is_alive: boolean;

  @Prop({
    required: false,
  })
  death_date: Date;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Applicant',
  })
  applicant: Applicant;

  @Prop({
    default: Date.now(),
  })
  created_at: Date;
}

export const RelativeSchema = SchemaFactory.createForClass(Relative);
