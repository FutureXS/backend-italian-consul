import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ApplicantDocument = HydratedDocument<Applicant>;

@Schema()
export class Applicant {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  last_name: string;

  @Prop({
    required: true,
  })
  birthday: Date;

  @Prop({
    required: true,
  })
  born_location: string;

  @Prop({
    required: true,
  })
  country: string;

  @Prop({
    required: true,
  })
  state: string;

  @Prop({
    required: true,
    type: Types.Map,
  })
  italian_address: {
    street: string;
    neighborhood: string;
    city: string;
    country: string;
    zipcode: string;
    number: string;
  };

  @Prop({
    required: true,
    type: Types.Map,
  })
  external_address: {
    street: string;
    neighborhood: string;
    city: string;
    country: string;
    zipcode: string;
    number: string;
  };

  @Prop({
    required: true,
  })
  has_passport: boolean;

  @Prop({
    required: false,
  })
  passport_number: string;

  @Prop({
    required: false,
  })
  passport_emission_date: Date;

  @Prop({
    required: true,
  })
  cpf: string;

  @Prop({
    required: true,
  })
  rg: string;

  @Prop({
    required: true,
  })
  rg_emission_date: Date;

  @Prop({
    default: Date.now(),
  })
  created_at: Date;
}

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
