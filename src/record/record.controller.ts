import { OutGetRecordDto } from './dto/out_get_record.dto';
import { InCreateRecordDto } from './dto/in_create_record.dto';
import { RecordService } from './record.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Record } from './schemas/record.schema';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutCreateRecordDto } from './dto/out_create_record.dto';

@ApiTags('Record')
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @ApiOperation({ summary: '운동 기록 조회' })
  @ApiResponse({
    type: OutGetRecordDto,
    description: '운동기록 조회',
    status: 200,
  })
  @Get('/get/:id')
  @UseGuards(AuthGuard())
  async getRecord(@Param('id') id: string): Promise<Record> {
    const outGetRecordDto = this.recordService.getRecord(id);
    return outGetRecordDto;
  }

  @ApiOperation({ summary: '운동 기록 생성' })
  @ApiResponse({
    type: OutCreateRecordDto,
    description: '생성된 운동기록',
    status: 200,
  })
  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createRecord(
    @Body() inCreateRecordDto: InCreateRecordDto,
  ): Promise<Record> {
    const outCreateRecordDto =
      this.recordService.createRecord(inCreateRecordDto);
    return outCreateRecordDto;
  }
}
