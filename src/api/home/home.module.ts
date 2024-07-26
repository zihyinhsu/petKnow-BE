import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { DatabaseModule } from '@data/database.module';
import { EnvModule } from '@config/env/env.module';
import { HomeController } from './home.controller';

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
