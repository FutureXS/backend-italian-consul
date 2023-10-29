import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Delete,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { DocumentsService, pipeFileValidation } from './documents.service';
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
    @UploadedFile(pipeFileValidation)
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

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('relative/:relativeId')
  public async getAllByRelative(@Param('relativeId') relativeId: string) {
    try {
      return await this.documentsService.getAllByRelative(relativeId);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':documentId')
  public async delete(@Param('documentId') documentId: string) {
    try {
      return await this.documentsService.delete(documentId);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':documentId')
  public async update(
    @Param('documentId') documentId: string,
    @UploadedFile(pipeFileValidation)
    file: Express.Multer.File,
  ) {
    try {
      return await this.documentsService.update(documentId, file);
    } catch (e) {
      throw e;
    }
  }
}
