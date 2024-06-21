import { Module } from '@nestjs/common';
import { BackstageService } from './backstage.service';
import { DatabaseModule } from '@data/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BackstageService],
})
export class BackstageModule {}
