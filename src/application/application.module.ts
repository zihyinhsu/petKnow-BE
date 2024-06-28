import { Module } from '@nestjs/common';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [CrudModule],
  exports: [CrudModule],
})
export class ApplicationModule {}
