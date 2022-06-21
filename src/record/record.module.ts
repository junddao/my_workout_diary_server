import { RecordController } from './record.controller';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './schemas/record.schema';
import { RecordRepository } from './record.repository';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
  ],
  controllers: [RecordController],
  providers: [RecordService, RecordRepository],
})
export class RecordModule {}
