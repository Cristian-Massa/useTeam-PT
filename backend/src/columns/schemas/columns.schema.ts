import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ColumnsDocument = HydratedDocument<Columns>;

@Schema({
  timestamps: true,
})
export class Columns {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Tasks', default: [] })
  tasks: Types.ObjectId[];

  @Prop()
  position: number;

  @Prop({ type: Types.ObjectId, ref: 'Kanban', required: true })
  kanban: Types.ObjectId;
}

export const ColumnsSchema = SchemaFactory.createForClass(Columns);
