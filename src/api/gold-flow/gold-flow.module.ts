import { Module } from '@nestjs/common';
import { GoldFlowService } from './gold-flow.service';
import { DatabaseModule } from '@data/database.module';
import { GoldFlowController } from './gold-flow.controller';
import { EnvModule } from '@config/env/env.module';
import { ValidateUtilsModule } from 'core/utils/validate-utils/validate-utils.module';

@Module({
  imports: [DatabaseModule, EnvModule, ValidateUtilsModule],
  providers: [GoldFlowService],
  controllers: [GoldFlowController],
})
export class GoldFlowModule {}
