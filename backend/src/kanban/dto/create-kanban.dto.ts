import { BaseKanbanDto } from './base-kanban.dto';
import { IsOptional, IsString } from 'class-validator';

export declare class CreateKanbanDto extends BaseKanbanDto {
  @IsString({ message: 'El nombre debe ser una cadena de caracteres.' })
  name: string;

  @IsString({ message: 'La contraseña debe ser una cadena de caracteres.' })
  password: string;
  @IsOptional()
  description?: string;
}
