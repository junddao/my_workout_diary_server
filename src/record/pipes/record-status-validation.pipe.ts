import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import RecordStatus from '../record_status.enum';

export class RecordStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [
    RecordStatus.GT,
    RecordStatus.VG,
    RecordStatus.GD,
    RecordStatus.NB,
    RecordStatus.BD,
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} status options error`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
