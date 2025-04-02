import { Controller, Get, Query } from '@nestjs/common';
import { ChargingSummaryService } from './charging-summary.service';

@Controller('charging-summary')
export class ChargingSummaryController {
  constructor(private readonly service: ChargingSummaryService) {}

  @Get('monthly')
  getMonthlySummary(@Query('from') from?: string, @Query('to') to?: string) {
    const range = this.getDateRange(from, to);
    return this.service.getMonthlySummary(range.from, range.to);
  }

  @Get('trend')
  getTrendData(@Query('from') from?: string, @Query('to') to?: string) {
    const range = this.getDateRange(from, to);
    return this.service.getTrendData(range.from, range.to);
  }

  private getDateRange(from?: string, to?: string): { from: Date; to: Date } {
    const isValidDate = (value?: string) =>
      value && !isNaN(new Date(value).getTime());
  
    if (isValidDate(from) && isValidDate(to)) {
      return {
        from: new Date(from!),
        to: new Date(to!),
      };
    }
  
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { from: start, to: end };
  }
  
}
