import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [EnvModule, SwaggerModule],
})
export class ConfigModule {}
