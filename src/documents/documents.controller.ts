import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAll(@Query('skip') skip = 0, @Query('limit') limit = 10) {
    try {
      return await this.documentsService.getAll(skip, limit);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  public async create(
    @Body() documentDto: CreateDocumentDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|pdf)$/,
        })
        .addMaxSizeValidator({
          maxSize: 15 * 1024 * 1024,
          message: 'File must be less than 15MB',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    try {
      return await this.documentsService.create(documentDto, file);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('applicant/:applicantId')
  public async getAllByApplicant(@Param('applicantId') applicantId: string) {
    try {
      return await this.documentsService.getAllByApplicant(applicantId);
    } catch (e) {
      throw e;
    }
  }
}
