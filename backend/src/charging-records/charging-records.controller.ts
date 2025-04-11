import { Controller, Get, Post, Body ,Patch,Param} from '@nestjs/common';
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
update(@Param('id') id: number, @Body() dto: Partial<UpdateChargingRecordDto>) {
  const updatedDto = {
    ...dto,
    date: dto.date ? new Date(dto.date) : undefined,
  };
  return this.service.update(+id, updatedDto);
}
}