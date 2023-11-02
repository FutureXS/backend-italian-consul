import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RelativesService, pipeFileValidation } from './relatives.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRelativeDto } from './dtos/create-relative.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import DocumentType from './enums/document-type.enum';
import { UpdateRelativeDto } from './dtos/update-relative.dto';

@Controller('relatives')
export class RelativesController {
  constructor(private relativesService: RelativesService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAll(@Query('skip') skip = 0, @Query('limit') limit = 10) {
    try {
      return await this.relativesService.getAll(skip, limit);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/applicant/:applicantId')
  public async getByApplicant(@Param('applicantId') applicantId: string) {
    try {
      return await this.relativesService.getByApplicant(applicantId);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':relativeId')
  public async getRelative(@Param('relativeId') relativeId: string) {
    try {
      return await this.relativesService.getRelative(relativeId);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
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
    ]),
  )
  public async create(
    @Body() relativeDto: CreateRelativeDto,
    @UploadedFiles(pipeFileValidation)
    files: {
      birth_document?: Express.Multer.File[];
      wedding_document?: Express.Multer.File[];
      death_document?: Express.Multer.File[];
    },
  ) {
    try {
      return await this.relativesService.create(relativeDto, files);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':relativeId')
  @UseInterceptors(
    FileFieldsInterceptor([
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
    ]),
  )
  public async update(
    @Param('relativeId') relativeId: string,
    @Body() relativeDto: UpdateRelativeDto,
    @UploadedFiles(pipeFileValidation)
    files: {
      birth_document?: Express.Multer.File[];
      wedding_document?: Express.Multer.File[];
      death_document?: Express.Multer.File[];
    },
  ) {
    try {
      return await this.relativesService.update(relativeId, relativeDto, files);
    } catch (e) {
      throw e;
    }
  }
}
