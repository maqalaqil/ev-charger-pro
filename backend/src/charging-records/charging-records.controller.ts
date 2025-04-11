import { Controller, Get, Post, Body ,Patch,Param} from '@nestjs/common';
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
update(@Param('id') id: number, @Body() updateDto: Partial<ChargingRecordDto>) {
  return this.service.update(+id, updateDto);
}
}