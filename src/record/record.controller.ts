import { RecordService } from './record.service';
import { Controller } from '@nestjs/common';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}
}
