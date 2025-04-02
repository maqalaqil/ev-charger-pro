import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AiController } from './ai.controller';
import { ChargingRecordsModule } from '../charging-records/charging-records.module';

@Module({
  imports: [HttpModule, ChargingRecordsModule],
  controllers: [AiController],
})
export class AiModule {}
