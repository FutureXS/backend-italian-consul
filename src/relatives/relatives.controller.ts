import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RelativesService } from './relatives.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRelativeDto } from './dtos/create-relative.dto';

@Controller('relatives')
export class RelativesController {
  constructor(private relativesService: RelativesService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() relativeDto: CreateRelativeDto) {
    try {
      return await this.relativesService.create(relativeDto);
    } catch (e) {
      throw e;
    }
  }
}
