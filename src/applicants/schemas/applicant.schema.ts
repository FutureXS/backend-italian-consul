import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicantDocument = HydratedDocument<Applicant>;

@Schema()
export class Applicant {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    default: Date.now(),
  })
  created_at: Date;
}

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
