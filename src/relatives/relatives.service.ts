import { HttpStatus, Injectable, ParseFilePipeBuilder } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Relative } from './schemas/relative.schema';
import { Model } from 'mongoose';
import { CreateRelativeDto } from './dtos/create-relative.dto';
import { UpdateRelativeDto } from './dtos/update-relative.dto';

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
      .populate(['applicant', 'relatives', 'father', 'mother'])
      .exec();
    return {
      totalPages,
      relatives,
    };
  }

  public async getByApplicant(applicantId: string) {
    return await this.relativeModel
      .find({ applicant: applicantId })
      .populate(['applicant', 'relatives', 'father', 'mother'])
      .exec();
  }

  public async getRelative(relativeId: string) {
    return await this.relativeModel
      .findById(relativeId)
      .populate(['applicant', 'relatives', 'father', 'mother'])
      .exec();
  }

  public async create(
    relativeDto: CreateRelativeDto,
    files: {
      birth_document?: Express.Multer.File[];
      wedding_document?: Express.Multer.File[];
      death_document?: Express.Multer.File[];
    },
  ) {
    const relative = new this.relativeModel({
      ...relativeDto,
      ...(files?.birth_document?.length && {
        birth_document: files.birth_document[0],
      }),
      ...(files?.wedding_document?.length && {
        wedding_document: files.wedding_document[0],
      }),
      ...(files?.death_document?.length && {
        death_document: files.death_document[0],
      }),
    });

    return await relative.save();
  }

  public async update(
    relativeId: string,
    relativeDto: UpdateRelativeDto,
    files: {
      birth_document?: Express.Multer.File[];
      wedding_document?: Express.Multer.File[];
      death_document?: Express.Multer.File[];
    },
  ) {
    const relative = await this.relativeModel.findById(relativeId).exec();

    if (!relative) {
      throw new Error('Relative not found');
    }

    relative.set({
      ...relativeDto,
      ...(files?.birth_document?.length && {
        birth_document: files.birth_document[0],
      }),
      ...(files?.wedding_document?.length && {
        wedding_document: files.wedding_document[0],
      }),
      ...(files?.death_document?.length && {
        death_document: files.death_document[0],
      }),
    });

    return await relative.save();
  }
}
