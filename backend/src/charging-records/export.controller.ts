import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChargingRecord } from './charging-record.entity';

@Controller('charging-export')
export class ExportController {
  constructor(
    @InjectRepository(ChargingRecord)
    private repo: Repository<ChargingRecord>,
  ) {}

  @Get('csv')
  async exportCSV(@Res() res: Response) {
    const records = await this.repo.find();
    let csv = 'Before,After,Total,Price,Date\n';
    for (const r of records) {
      csv += `${r.readingBefore},${r.readingAfter},${r.totalCharged},${r.price},"${r.date.toISOString()}"\n`;
    }
    res.header('Content-Type', 'text/csv');
    res.attachment('charging-records.csv');
    res.send(csv);
  }
}