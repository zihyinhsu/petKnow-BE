import { Module } from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import { EnvModule } from '@config/env/env.module';

@Module({
  imports: [EnvModule],
  providers: [SwaggerService],
  exports: [SwaggerService],
})
export class SwaggerModule {}
