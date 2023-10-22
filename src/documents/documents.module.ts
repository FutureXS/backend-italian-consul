import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from './schemas/document.schema';
import { ApplicantsModule } from 'src/applicants/applicants.module';

@Module({
  imports: [
    ApplicantsModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
