import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ChargingRecordsService } from '../charging-records/charging-records.service';
import { firstValueFrom } from 'rxjs';

@Controller('ai')
export class AiController {
  constructor(
    private readonly http: HttpService,
    private readonly chargingService: ChargingRecordsService,
  ) {}

  @Get('forecast')
  async getForecast() {
    const records = await this.chargingService.findAll();

    const payload = records
    .filter(r => r.date && r.totalCharged !== null && r.totalCharged >= 0)
    .map(r => ({
      date: new Date(r.date).toISOString().slice(0, 10), // enforce format
      totalCharged: r.totalCharged,
    }));
  

    const res = await firstValueFrom(
      this.http.post('http://ec2-3-248-227-129.eu-west-1.compute.amazonaws.com:8000/forecast', payload)
    );

    return res.data;
  }
  @Get('forecast/usage')
async getUsageForecast() {
  const records = await this.chargingService.findAll();

  const payload = records
    .filter(r => r.date && r.totalCharged !== null)
    .map(r => ({
      date: new Date(r.date).toISOString().slice(0, 10),
      totalCharged: r.totalCharged,
    }));

  const res = await firstValueFrom(
    this.http.post('http://ec2-3-248-227-129.eu-west-1.compute.amazonaws.com:8000/forecast/usage', payload)
  );

  return res.data;
}

}
