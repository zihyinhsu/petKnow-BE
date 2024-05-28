import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerPrefix = 'api';

export function setupSwagger(app: INestApplication): void {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('petKnow 寵知')
    .setDescription('API 文件')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
        description: '請加上 API Token',
      },
      'apiKeyAuth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true, // 開啟搜尋列
  };

  SwaggerModule.setup(swaggerPrefix, app, document, options);
}
