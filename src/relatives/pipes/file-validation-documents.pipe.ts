import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationDocumentsPipe implements PipeTransform {
  private maxSize = 3 * 1024 * 1024;
  private messageAllowedTypes =
    'File type not supported. Allowed types: jpg, jpeg, png, pdf';
  private messageMaxSize = 'File must be less than 3MB';
  private errors = [];

  constructor(private isPatch = false) {}

  async transform(value: any) {
    if (value?.birth_document?.length) {
      this.validateField(value?.birth_document[0]);
    } else if (!this.isPatch) {
      this.errors?.push({
        field: 'birth_document',
        message: 'Birth document is required',
      });
    }

    if (value?.wedding_document?.length) {
      this.validateField(value?.wedding_document[0]);
    } else if (!this.isPatch) {
      this.errors?.push({
        field: 'wedding_document',
        message: 'Wedding document is required',
      });
    }

    if (value?.death_document?.length) {
      this.validateField(value?.death_document[0]);
    } else if (!this.isPatch) {
      this.errors?.push({
        field: 'death_document',
        message: 'Death document is required',
      });
    }

    if (this.errors?.length) {
      throw new BadRequestException(
        this.errors?.map((error) => error?.message),
      );
    }

    return value;
  }

  private validateField = (field: any) => {
    if (!this.isAllowedType(field?.mimetype)) {
      this.errors?.push({
        field: field?.fieldname,
        message: this.messageAllowedTypes,
      });
    }

    if (field?.size > this.maxSize) {
      this.errors?.push({
        field: field?.fieldname,
        message: this.messageMaxSize,
      });
    }
  };

  private isAllowedType = (type: string) => {
    return /(jpg|jpeg|png|pdf)$/.test(type);
  };
}
