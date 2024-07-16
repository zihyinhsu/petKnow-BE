import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from './database/database.module';
import { RoleGuard } from '@api/users/auth/role.guard';
import { ApiModule } from './api/api.module';
import { Api2Module } from './api2/api2.module';
import { ApplicationModule } from './application/application.module';
import { ValidateUtilsModule } from './core/utils/validate-utils/validate-utils.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ApiModule,
    Api2Module,
    ApplicationModule,
    ValidateUtilsModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClassSerializerInterceptor, RoleGuard],
})
export class AppModule {}
