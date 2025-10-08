// columns.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Columns } from '@app/columns/schemas/columns.schema';
import { CreateColumnDto } from '@app/columns/dto/create-column.dto';
import { UpdateColumnDto } from '@app/columns/dto/update-column.dto';
import { BaseResponse } from '@app/shared/interfaces/base-response';
import { TasksService } from '@app/tasks/services/tasks.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Columns.name) private readonly columnModel: Model<Columns>,
    private readonly tasksService: TasksService,
  ) {}
  async swapPosition(firstColumnId: string, secondColumnId: string) {
    const [firstColumn, secondColumn] = await Promise.all([
      this.columnModel.findById(firstColumnId),
      this.columnModel.findById(secondColumnId),
    ]);

    if (!firstColumn || !secondColumn) {
      throw new NotFoundException('Una de las columnas no existe');
    }

    const tempPosition = firstColumn.position;
    firstColumn.position = secondColumn.position;
    secondColumn.position = tempPosition;

    await Promise.all([firstColumn.save(), secondColumn.save()]);

    return {
      data: { firstColumn, secondColumn },
      status: 200,
    };
  }

  async findAll(kanbanId: string): Promise<BaseResponse<Columns[]>> {
    const columns = await this.columnModel
      .find()
      .where({
        kanban: kanbanId,
      })
      .exec();

    return {
      data: columns,
      status: 200,
    };
  }

  async update(
    id: string | Types.ObjectId,
    updateColumnDto: UpdateColumnDto,
  ): Promise<Columns> {
    const column = await this.columnModel
      .findByIdAndUpdate(id, updateColumnDto, {
        new: true,
      })
      .exec();
    if (!column)
      throw new NotFoundException(`Columna con el id:${id} no se encontro`);
    return column;
  }

  async remove(id: string): Promise<Columns> {
    const [column] = await Promise.all([
      this.columnModel.findByIdAndDelete(id).exec(),
      this.tasksService.deleteByColumn(id),
    ]);

    if (!column)
      throw new NotFoundException(`Columna con el id:${id} no se encontro`);
    return column;
  }

  async createColumn(createColumnDto: CreateColumnDto) {
    const { name, kanban } = createColumnDto;

    const lastColumn = await this.columnModel
      .findOne({ kanban })
      .sort({ position: -1 })
      .exec();

    const position = lastColumn ? lastColumn.position + 1 : 1;

    const column = new this.columnModel({ ...createColumnDto, position });
    return column.save();
  }
}
