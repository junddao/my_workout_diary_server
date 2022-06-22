import { InGetRecordsDto } from './dto/in_get_records.dto';
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
import { ApiResponseDto, ResponseDto } from 'src/common/dto/response.dto';
@ApiTags('Record')
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @ApiOperation({ summary: '운동 기록 조회' })
  @ApiResponseDto(OutGetRecordDto)
  @Get('/get/:id')
  @UseGuards(AuthGuard())
  async getRecord(
    @Param('id') id: string,
  ): Promise<ResponseDto<OutGetRecordDto>> {
    const data = await this.recordService.getRecord(id);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: '운동 기록 조회' })
  @ApiResponseDto(OutGetRecordDto)
  @Post('/get/records')
  @UseGuards(AuthGuard())
  async getRecords(
    @Body() inGetRecordsDto: InGetRecordsDto,
  ): Promise<ResponseDto<OutGetRecordDto>> {
    const data = await this.recordService.getRecords(inGetRecordsDto);
    return {
      success: true,
      error: null,
      data: data,
    };
  }

  @ApiOperation({ summary: '운동 기록 생성' })
  @ApiResponseDto(OutGetRecordDto)
  @Post('/create')
  @UseGuards(AuthGuard())
  async createRecord(
    @Body() inCreateRecordDto: InCreateRecordDto,
  ): Promise<ResponseDto<OutGetRecordDto>> {
    const data = await this.recordService.createRecord(inCreateRecordDto);
    return {
      success: true,
      error: null,
      data: [data],
    };
  }
}
