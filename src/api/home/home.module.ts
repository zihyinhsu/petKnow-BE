import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { DatabaseModule } from '@data/database.module';
import { EnvModule } from '@config/env/env.module';
import { HomeController } from './home.controller';
import { ValidateUtilsModule } from 'core/utils/validate-utils/validate-utils.module';

@Module({
  imports: [DatabaseModule, EnvModule, ValidateUtilsModule],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
