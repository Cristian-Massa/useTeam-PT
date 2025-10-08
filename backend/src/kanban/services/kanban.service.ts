import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKanbanDto } from '@app/kanban/dto/create-kanban.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Kanban } from '@app/kanban/shemas/kanban.schema';
import { Model } from 'mongoose';
import { BaseKanbanDto } from '@app/kanban/dto/base-kanban.dto';
import { BaseResponse } from '@app/shared/interfaces/base-response';

@Injectable()
export class KanbanService {
  constructor(
    @InjectModel(Kanban.name) private readonly kanbanModel: Model<Kanban>,
  ) {}

  async create(
    createKanbanDto: CreateKanbanDto,
  ): Promise<BaseResponse<Kanban>> {
    const kanban = new this.kanbanModel(createKanbanDto);
    await kanban.save();

    return {
      data: kanban,
      message: 'Kanban creado exitosamente',
      status: 201,
    };
  }

  async findAll(): Promise<BaseResponse<Kanban[]>> {
    const count = await this.kanbanModel.countDocuments().exec();
    const kanbans = await this.kanbanModel.find().exec();
    return {
      data: kanbans,
      status: 200,
      total: count,
    };
  }

  async findOne(id: string): Promise<BaseResponse<Kanban>> {
    const kanban = await this.kanbanModel.findById(id).exec();

    if (!kanban) {
      throw new NotFoundException('Kanban no encontrado');
    }

    return {
      data: kanban,
      status: 200,
    };
  }

  async update(
    id: string,
    updateKanbanDto: BaseKanbanDto,
  ): Promise<BaseResponse<Kanban>> {
    const updated = await this.kanbanModel
      .findByIdAndUpdate(id, updateKanbanDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Kanban no encontrado');
    }
    return {
      data: updated,
      status: 200,
      message: 'Kanban actualizado exitosamente',
    };
  }

  async remove(id: string): Promise<BaseResponse<Kanban>> {
    const deleted = await this.kanbanModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Kanban no encontrado');
    }
    return {
      data: deleted,
      status: 200,
      message: 'Kanban eliminado exitosamente',
    };
  }
}
