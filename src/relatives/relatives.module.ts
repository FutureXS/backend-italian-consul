import { Module } from '@nestjs/common';
import { RelativesService } from './relatives.service';
import { RelativesController } from './relatives.controller';

@Module({
  providers: [RelativesService],
  controllers: [RelativesController]
})
export class RelativesModule {}
