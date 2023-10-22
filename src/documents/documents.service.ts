import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from './schemas/document.schema';
import { Model, Types } from 'mongoose';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { ApplicantsService } from 'src/applicants/applicants.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<Document>,
    private applicantsService: ApplicantsService,
  ) {}

  public async getAll(skip = 0, limit = 10) {
    const count = await this.documentModel.countDocuments().exec();
    const totalPages = Math.ceil(count / limit);
    const documents = await this.documentModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({
        created_at: 'desc',
      })
      .populate(['applicant', 'relative'])
      .exec();
    return {
      totalPages,
      documents,
    };
  }

  public async create(
    documentDto: CreateDocumentDto,
    file: Express.Multer.File,
  ) {
    const applicant = await this.applicantsService.findApplicant(
      documentDto.applicant,
    );

    if (!applicant) {
      throw new Error('Applicant not found');
    }

    const document = new this.documentModel({
      ...documentDto,
      file: file,
      applicant: applicant?.id,
    });
    return await document.save();
  }

  public async getAllByApplicant(applicantId: string) {
    return await this.documentModel
      .find({
        applicant: applicantId,
      })
      .exec();
  }

  public async delete(id: string) {
    return await this.documentModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .exec();
  }

  public async update(id: string, file: Express.Multer.File) {
    return await this.documentModel
      .findByIdAndUpdate(new Types.ObjectId(id), {
        file,
      })
      .exec();
  }
}
