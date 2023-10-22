import {
  Controller,
  HttpStatus,
  UseGuards,
  HttpCode,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateApplicantDto } from './dtos/create-applicant.dto';
import { UpdateApplicantDto } from './dtos/update-applicant.dto';

@Controller('applicants')
export class ApplicantsController {
  constructor(private applicantsService: ApplicantsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAll(@Query('skip') skip = 0, @Query('limit') limit = 10) {
    try {
      return await this.applicantsService.getAll(skip, limit);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() applicantDto: CreateApplicantDto) {
    try {
      return await this.applicantsService.create(applicantDto);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() applicantDto: UpdateApplicantDto,
  ) {
    try {
      return await this.applicantsService.update(id, applicantDto);
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    try {
      return await this.applicantsService.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
