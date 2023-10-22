import { Module } from '@nestjs/common';
import { ApplicantsController } from './applicants.controller';
import { ApplicantsService } from './applicants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Applicant, ApplicantSchema } from './schemas/applicant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Applicant.name, schema: ApplicantSchema },
    ]),
  ],
  exports: [ApplicantsService],
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
})
export class ApplicantsModule {}
