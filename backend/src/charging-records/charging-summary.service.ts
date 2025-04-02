import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ChargingRecord } from './charging-record.entity';


@Injectable()
export class ChargingSummaryService {
  constructor(
    @InjectRepository(ChargingRecord)
    private repo: Repository<ChargingRecord>,
  ) {}

  async getMonthlySummary(from: Date, to: Date) {
    const records = await this.repo.find({
      where: {
        date: Between(from, to),
      },
    });
  
    const totalCharged = records.reduce((sum, r) => sum + r.totalCharged, 0);
    const totalCost = records.reduce((sum, r) => sum + r.price, 0);
    const avgPrice = totalCharged ? totalCost / totalCharged : 0;
  
    return {
      totalCharged,
      totalCost,
      avgPrice,
    };
  }
  
  async getTrendData(from: Date, to: Date) {
    const records = await this.repo.find({
      where: {
        date: Between(from, to),
      },
      order: { date: 'ASC' },
    });

  
  
    return records.map((r) => ({
      date: r.date,
      totalCharged: r.totalCharged,
      price: r.price,
    }));
  }
  
}