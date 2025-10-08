import { ColumnsService } from '@app/columns/services/columns.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}
  @Get(':kanbanId')
  async getColumns(@Param('kanbanId') kanbanId: string) {
    return this.columnsService.findAll(kanbanId);
  }
}
