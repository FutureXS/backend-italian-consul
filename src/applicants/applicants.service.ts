import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Applicant } from './schemas/applicant.schema';
import { Model, Types } from 'mongoose';
import { CreateApplicantDto } from './dtos/create-applicant.dto';
import { UpdateApplicantDto } from './dtos/update-applicant.dto';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectModel(Applicant.name) private applicantModel: Model<Applicant>,
  ) {}

  public async getAll(skip = 0, limit = 10) {
    const count = await this.applicantModel.countDocuments().exec();
    const totalPages = Math.ceil(count / limit);
    const applicants = await this.applicantModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({
        created_at: 'desc',
      })
      .exec();
    return {
      totalPages,
      applicants,
    };
  }

  public async create(applicantDto: CreateApplicantDto) {
    const applicant = new this.applicantModel(applicantDto);
    return await applicant.save();
  }

  public async update(id: string, applicantDto: UpdateApplicantDto) {
    return await this.applicantModel
      .findByIdAndUpdate(new Types.ObjectId(id), applicantDto)
      .exec();
  }

  public async findApplicant(id: string) {
    return await this.applicantModel.findById(id);
  }

  public async delete(id: string) {
    return this.applicantModel.findByIdAndDelete(id).exec();
  }
}
