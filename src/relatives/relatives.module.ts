import { Module } from '@nestjs/common';
import { RelativesService } from './relatives.service';
import { RelativesController } from './relatives.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Relative, RelativeSchema } from './schemas/relative.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Relative.name, schema: RelativeSchema },
    ]),
  ],
  providers: [RelativesService],
  controllers: [RelativesController],
})
export class RelativesModule {}
