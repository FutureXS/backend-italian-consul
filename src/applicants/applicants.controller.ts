import {
  Controller,
  HttpStatus,
  UseGuards,
  HttpCode,
  Post,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateApplicantDto } from './dtos/create-applicant.dto';

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
}
