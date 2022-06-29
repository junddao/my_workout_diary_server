import { OutGetTopRankersDto } from './dto/out_get_top_rankers.dto';
import { InGetRecordsDto } from './dto/in_get_records.dto';
import { OutGetRecordDto } from './dto/out_get_record.dto';
import { InCreateRecordDto } from './dto/in_create_record.dto';
import { RecordService } from './record.service';
import {
  Body,
  Controller,
  Delete,
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
import { InGetTopRankersDto } from './dto/in_get_top_rankers.dto';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
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

  @ApiOperation({ summary: '운동 기록 삭제' })
  @Delete('/delete/:id')
  @UseGuards(AuthGuard())
  async deleteRecord(@Param('id') id: string): Promise<ResponseDto<null>> {
    await this.recordService.deleteRecord(id);
    return {
      success: true,
      error: null,
      data: null,
    };
  }

  @ApiOperation({ summary: '운동 기록 생성' })
  @ApiResponseDto(OutGetRecordDto)
  @Post('/create')
  @UseGuards(AuthGuard())
  async createRecord(
    @Body() inCreateRecordDto: InCreateRecordDto,
    @GetUser() user: User,
  ): Promise<ResponseDto<OutGetRecordDto>> {
    const data = await this.recordService.createRecord(
      inCreateRecordDto,
      user._id,
    );
    return {
      success: true,
      error: null,
      data: [data],
    };
  }

  @ApiOperation({ summary: 'top10 조회' })
  @ApiResponseDto(OutGetTopRankersDto)
  @Post('/get/rankers')
  @UseGuards(AuthGuard())
  async getRank(
    @Body() inGetRecordsRankDto: InGetTopRankersDto,
  ): Promise<ResponseDto<OutGetTopRankersDto>> {
    const data = await this.recordService.getTopRankers(inGetRecordsRankDto);
    return {
      success: true,
      error: null,
      data: data,
    };
  }
}
