import { Module } from '@nestjs/common';
import { ValidateUtilsModule } from './utils/validate-utils/validate-utils.module';

@Module({
  imports: [ValidateUtilsModule],
})
export class CoreModule {}
