import { Controller, Get, Post, Body ,Patch,Param, ParseIntPipe} from '@nestjs/common';
import { UpdateChargingRecordDto } from './charging-record.dto'; // Adjust the path as needed
import { ChargingRecordsService } from './charging-records.service';

@Controller('charging-records')
export class ChargingRecordsController {
  constructor(private service: ChargingRecordsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post()
create(@Body() body: { readingAfter: number; kwhPrice: number; date: Date }) {
  return this.service.create(body);
}

@Patch(':id')
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateChargingRecordDto
) {
  return this.service.update(id, dto);
}
}