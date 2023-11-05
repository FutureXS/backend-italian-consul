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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RelativesService } from './relatives.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRelativeDto } from './dtos/create-relative.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
    FileFieldsInterceptor(
      RelativesService.filesInterceptorArray,
      RelativesService.filesInterceptorOptions,
    ),
  )
  public async create(
    @Body() relativeDto: CreateRelativeDto,
    @UploadedFiles()
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
  @HttpCode(HttpStatus.OK)
  @Patch(':relativeId')
  @UseInterceptors(
    FileFieldsInterceptor(
      RelativesService.filesInterceptorArray,
      RelativesService.filesInterceptorOptions,
    ),
  )
  public async update(
    @Param('relativeId') relativeId: string,
    @Body() relativeDto: UpdateRelativeDto,
    @UploadedFiles()
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
