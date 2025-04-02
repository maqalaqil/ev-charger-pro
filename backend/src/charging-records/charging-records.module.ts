import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargingRecord } from './charging-record.entity';
import { ChargingRecordsController } from './charging-records.controller';
import { ChargingRecordsService } from './charging-records.service';
import { ChargingSummaryService } from './charging-summary.service';
import { ChargingSummaryController } from './charging-summary.controller';
import { ExportController } from './export.controller';
import { NotifyService } from './notify.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChargingRecord])],
  providers: [ChargingRecordsService, ChargingSummaryService, NotifyService],
  controllers: [ChargingRecordsController, ChargingSummaryController, ExportController],
  exports: [ChargingRecordsService] // ✅ This makes it accessible to other modules

})
export class ChargingRecordsModule {}