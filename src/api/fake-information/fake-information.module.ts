import { Module } from '@nestjs/common';
import { FakeInformationService } from './fake-information.service';
import { DatabaseModule } from '@data/database.module';
import { FakeInformationController } from './fake-information.controller';

@Module({
  imports: [DatabaseModule],
  providers: [FakeInformationService],
  controllers: [FakeInformationController],
})
export class FakeInformationModule {}
