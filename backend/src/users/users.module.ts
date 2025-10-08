import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/users/schema/users.schema';
import { UsersController } from '@app/users/controllers/users.controller';
import { UsersService } from '@app/users/services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
