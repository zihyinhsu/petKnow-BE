import { Module } from '@nestjs/common';
import { BackstageService } from './backstage.service';
import { DatabaseModule } from '@data/database.module';
import { BackstageController } from './backstage.controller';

@Module({
  imports: [DatabaseModule],
  providers: [BackstageService],
  controllers: [BackstageController],
})
export class BackstageModule {}
