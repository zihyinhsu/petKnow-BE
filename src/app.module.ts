import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from './database/database.module';
import { RoleGuard } from '@api/users/auth/role.guard';
import { ApiModule } from './api/api.module';
import { Api2Module } from './api2/api2.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ApiModule, Api2Module],
  controllers: [AppController],
  providers: [AppService, ClassSerializerInterceptor, RoleGuard],
})
export class AppModule {}
