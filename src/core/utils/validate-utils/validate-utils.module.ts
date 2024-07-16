import { Module } from '@nestjs/common';
import { ValidateUtilsService } from './validate-utils.service';

@Module({
  providers: [ValidateUtilsService],
  exports: [ValidateUtilsService],
})
export class ValidateUtilsModule {}
