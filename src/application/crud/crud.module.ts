import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { DatabaseModule } from '@data/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CrudService],
  exports: [CrudService],
})
export class CrudModule {}
