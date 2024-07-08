import { Module } from '@nestjs/common';
import { GoldFlowService } from './gold-flow.service';
import { DatabaseModule } from '@data/database.module';
import { EnvService } from '@config/env/env.service';

@Module({
  imports: [DatabaseModule, EnvService],
  providers: [GoldFlowService],
})
export class GoldFlowModule {}
