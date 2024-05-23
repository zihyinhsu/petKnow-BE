import { NestFactory, Reflector } from '@nestjs/core';
import * as dotenv from 'dotenv';
import {
  HttpStatus,
  NotAcceptableException,
  ValidationPipe,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger, swaggerPrefix } from './application/config/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './application/response/response.interceptor';
import { EnvService } from './application/config/env/env.service';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const envService = new EnvService(configService);
  const port = envService.getPort();
  const server = envService.getServer();

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 幫助濾掉非 dto 內定義的欄位,
      exceptionFactory: () => {
        return new NotAcceptableException({
          status: HttpStatus.BAD_REQUEST,
          isSuccess: false,
          message: '錯誤的請求', // 自訂錯誤訊息
        });
      },
    }),
  );
  app.enableCors(); // 允許跨域
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //全域攔截器，攔截掉敏感資料
  app.useGlobalInterceptors(new ResponseInterceptor()); //全域攔截器，制定統一的 response
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${server}:${port}/${swaggerPrefix}`);
}

bootstrap();
