import { Module } from '@nestjs/common';
import { GoldFlowService } from './gold-flow.service';
import { DatabaseModule } from '@data/database.module';
import { GoldFlowController } from './gold-flow.controller';
import { CoreModule } from 'core/core.module';
import { EnvModule } from '@config/env/env.module';

@Module({
  imports: [DatabaseModule, EnvModule, CoreModule],
  providers: [GoldFlowService],
  controllers: [GoldFlowController],
})
export class GoldFlowModule {}
