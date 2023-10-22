import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Relative } from './schemas/relative.schema';
import { Model } from 'mongoose';
import { CreateRelativeDto } from './dtos/create-relative.dto';

@Injectable()
export class RelativesService {
  constructor(
    @InjectModel(Relative.name) private relativeModel: Model<Relative>,
  ) {}

  public async create(relativeDto: CreateRelativeDto) {
    const relative = new this.relativeModel(relativeDto);
    return await relative.save();
  }
}
