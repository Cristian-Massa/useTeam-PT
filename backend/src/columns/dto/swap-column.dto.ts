import { IsString } from 'class-validator';

export class SwapColumnsDto {
  @IsString()
  firstColumnId: string;

  @IsString()
  secondColumnId: string;
}
