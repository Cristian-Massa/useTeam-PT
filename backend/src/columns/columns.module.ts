import { Module } from '@nestjs/common';
import { ColumnsService } from '@app/columns/services/columns.service';
import { ColumnsGateway } from '@app/columns/gateway/columns.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Columns, ColumnsSchema } from '@app/columns/schemas/columns.schema';
import { ColumnsController } from '@app/columns/controllers/columns.controller';
import { TasksModule } from '@app/tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forFeature([
      {
        name: Columns.name,
        schema: ColumnsSchema,
      },
    ]),
  ],
  controllers: [ColumnsController],
  providers: [ColumnsGateway, ColumnsService],
})
export class ColumnsModule {}
