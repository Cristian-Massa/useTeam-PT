import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

type TasksDocument = HydratedDocument<Tasks>;

@Schema({
  timestamps: true,
})
export class Tasks {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  comments: string[];

  @Prop()
  priority: string;

  @Prop()
  assignedTo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Columns' })
  column: Types.ObjectId;
}

export const TaksSchema = SchemaFactory.createForClass(Tasks);
