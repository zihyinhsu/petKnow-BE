import { Injectable, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import path from 'path';
@Injectable()
export class SwaggerService {
  swaggerPrefix = 'api';

  initial(app: INestApplication) {
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

    // 寫入檔案
    const filePath = path.join(__dirname, 'swagger_output.json');

    // 產生 JSON 格式的 Swagger 文件
    const swaggerJson = JSON.stringify(document, null, 2);

    writeFileSync(filePath, swaggerJson, 'utf-8');

    SwaggerModule.setup(this.swaggerPrefix, app, document, options);
  }
}
