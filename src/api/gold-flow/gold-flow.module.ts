import { Module } from '@nestjs/common';
import { GoldFlowService } from './gold-flow.service';
import { DatabaseModule } from '@data/database.module';
import { EnvService } from '@config/env/env.service';
import { GoldFlowController } from './gold-flow.controller';

@Module({
  imports: [DatabaseModule, EnvService],
  providers: [GoldFlowService],
  controllers: [GoldFlowController],
})
export class GoldFlowModule {}
