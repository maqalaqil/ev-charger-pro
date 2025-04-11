import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChargingRecord } from './charging-record.entity';
import { NotifyService } from './notify.service';
import { UpdateChargingRecordDto } from './charging-record.dto';


@Injectable()
export class ChargingRecordsService {
  constructor(
    @InjectRepository(ChargingRecord)
    private repo: Repository<ChargingRecord>,
    private notifier: NotifyService
  ) {}

  findAll() {
    return this.repo.find({ order: { date: 'ASC' } });
  } 
  async update(id: number, dto: UpdateChargingRecordDto) {
    const record = await this.repo.findOneBy({ id });
  
    if (!record) {
      throw new NotFoundException('Charging record not found');
    }
  
    // Calculate new values if readingAfter is being updated
    if (dto.readingAfter !== undefined) {
      record.totalCharged = dto.readingAfter - record.readingBefore;
      record.readingAfter = dto.readingAfter;
  
      if (dto.kwhPrice !== undefined) {
        record.price = record.totalCharged * dto.kwhPrice;
      }
    }
  
    // Update date if provided
    if (dto.date !== undefined) {
      record.date = new Date(dto.date);
    }
  
    return await this.repo.save(record);
  }
  

  async create(data: { readingAfter: number; kwhPrice: number; date: Date }) {
    // Step 1: Get the last record sorted by `readingAfter`
    const last = await this.repo
      .createQueryBuilder('record')
      .orderBy('record.readingAfter', 'DESC')
      .limit(1)
      .getOne();
  
    const lastReading = last?.readingAfter ?? 0;
  
    // Step 2: Validate that new reading is greater
    if (data.readingAfter <= lastReading) {
      throw new BadRequestException(
        `New reading (${data.readingAfter}) must be greater than the last reading (${lastReading})`
      );
    }
  
    const totalCharged = data.readingAfter - lastReading;
    const price = totalCharged * data.kwhPrice;
  
    const record = this.repo.create({
      readingBefore: lastReading,
      readingAfter: data.readingAfter,
      totalCharged,
      price,
      date: data.date,
    });
  
    const saved = await this.repo.save(record);
    return this.repo.findOne({ where: { id: saved.id } });
  }
  
  
  
}