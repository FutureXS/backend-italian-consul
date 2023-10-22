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
    default: Date.now(),
  })
  created_at: Date;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
