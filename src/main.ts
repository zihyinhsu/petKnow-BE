import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import {
  INestApplication,
  HttpStatus,
  NotAcceptableException,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('petKnow 寵知')
    .setDescription('API 文件')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const options: SwaggerCustomOptions = {
    explorer: true, // 是否開啟搜尋列
  };
  SwaggerModule.setup('api', app, document, options);
}
bootstrap();
