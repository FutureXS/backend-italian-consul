import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Applicant } from './schemas/applicant.schema';
import { Model } from 'mongoose';
import { CreateApplicantDto } from './dtos/create-applicant.dto';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectModel(Applicant.name) private applicantModel: Model<Applicant>,
  ) {}

  public async getAll(skip = 0, limit = 10) {
    const count = await this.applicantModel.countDocuments().exec();
    const totalPages = Math.ceil(count / limit);
    const documents = await this.applicantModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({
        created_at: 'desc',
      })
      .exec();
    return {
      totalPages,
      documents,
    };
  }

  public async create(applicantDto: CreateApplicantDto) {
    const applicant = new this.applicantModel(applicantDto);
    return await applicant.save();
  }

  public async findApplicant(id: string) {
    return await this.applicantModel.findById(id);
  }
}
