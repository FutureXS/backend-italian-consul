import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RelativesService, pipeFileValidation } from './relatives.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRelativeDto } from './dtos/create-relative.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
    FileInterceptor('birth_document'),
    FileInterceptor('wedding_document'),
    FileInterceptor('death_document'),
  )
  public async create(
    @Body() relativeDto: CreateRelativeDto,
    @UploadedFile(pipeFileValidation) birth_document: Express.Multer.File,
    @UploadedFile(pipeFileValidation) wedding_document: Express.Multer.File,
    @UploadedFile(pipeFileValidation) death_document: Express.Multer.File,
  ) {
    try {
      return await this.relativesService.create(relativeDto, {
        birth_document,
        wedding_document,
        death_document,
      });
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':relativeId')
  @UseInterceptors(
    FileInterceptor('birth_document'),
    FileInterceptor('wedding_document'),
    FileInterceptor('death_document'),
  )
  public async update(
    @Param('relativeId') relativeId: string,
    @Body() relativeDto: UpdateRelativeDto,
    @UploadedFile(pipeFileValidation) birth_document: Express.Multer.File,
    @UploadedFile(pipeFileValidation) wedding_document: Express.Multer.File,
    @UploadedFile(pipeFileValidation) death_document: Express.Multer.File,
  ) {
    try {
      return await this.relativesService.update(relativeId, relativeDto, {
        birth_document,
        wedding_document,
        death_document,
      });
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    try {
      return await this.relativesService.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
