import { IsOptional, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateChargingRecordDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readingAfter?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  kwhPrice?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}