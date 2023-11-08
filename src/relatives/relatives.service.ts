import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Relative } from './schemas/relative.schema';
import { Model } from 'mongoose';
import { CreateRelativeDto } from './dtos/create-relative.dto';
import { UpdateRelativeDto } from './dtos/update-relative.dto';
import collect from 'collect.js';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import DocumentType from './enums/document-type.enum';
import MimeType from './enums/mime-type.enum';
import { FileErrorMessages } from './errors/file.error';

@Injectable()
export class RelativesService {
  public static filesInterceptorArray: MulterField[] = [
    {
      name: DocumentType.BIRTH_DOCUMENT,
      maxCount: 1,
    },
    {
      name: DocumentType.WEDDING_DOCUMENT,
      maxCount: 1,
    },
    {
      name: DocumentType.DEATH_DOCUMENT,
      maxCount: 1,
    },
  ];

  public static filesInterceptorOptions = {
    limits: {
      fileSize: 3 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const { mimetype } = file;

      if (
        [
          MimeType.PDF.toString(),
          MimeType.JPEG.toString(),
          MimeType.JPG.toString(),
          MimeType.PNG.toString(),
        ].includes(mimetype)
      ) {
        return cb(null, true);
      }

      return cb(
        new BadRequestException(FileErrorMessages.FILE_NOT_SUPPORTED),
        false,
      );
    },
  };

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
   /*  await this.validateFamily(relativeDto); */

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
    if(relative.father){
      const f = await this.getRelative(relative.father as unknown as string)
      console.log(f.name, " === " ,  relative.documents_data[0].father_data.first_name)
      if(f.name === relative.documents_data[0].father_data.first_name){
      console.log("name is correct ")

      }else{
        throw new Error('Father name is incorrect');
      }
    }

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

  public async delete(id: string) {
    return this.relativeModel.findByIdAndDelete(id).exec();
  }

  private async validateFamily(relativeDto: CreateRelativeDto) {
    const applicantRelatives = await this.relativeModel
      .find({ applicant: relativeDto.applicant })
      .exec();

    if (applicantRelatives?.length <= 1) {
      return true;
    }

    collect(applicantRelatives).each((applicantRelative) => {
      const dataCollapsed = collect(relativeDto.documents_data).collapse();

      const applicantRelativeExists = dataCollapsed
        .where('name', applicantRelative.name)
        .first();

      if (!applicantRelativeExists) {
        throw new NotFoundException(
          `Relative ${applicantRelative.name} not found`,
        );
      }
    });
  }
}
