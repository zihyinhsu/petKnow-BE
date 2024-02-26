import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // connect entity
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule],
})
export class UsersModule {}
