import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Relative } from './schemas/relative.schema';
import { Model } from 'mongoose';
import { CreateRelativeDto } from './dtos/create-relative.dto';

@Injectable()
export class RelativesService {
  constructor(
    @InjectModel(Relative.name) private relativeModel: Model<Relative>,
  ) {}

  public async getAll(skip = 0, limit = 10) {
    const count = await this.relativeModel.countDocuments().exec();
    const totalPages = Math.ceil(count / limit);
    const relatives = await this.relativeModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({
        created_at: 'desc',
      })
      .populate('applicant')
      .exec();
    return {
      totalPages,
      relatives,
    };
  }

  public async getByApplicant(applicantId: string) {
    return await this.relativeModel.find({ applicant: applicantId });
  }

  public async create(relativeDto: CreateRelativeDto) {
    const relative = new this.relativeModel(relativeDto);
    return await relative.save();
  }
}
