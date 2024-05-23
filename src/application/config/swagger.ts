import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvService } from './env/env.service';

export const swaggerPrefix = 'api';

export function setupSwagger(app: INestApplication): void {
  const configService = new ConfigService();
  const envService = new EnvService(configService);
  const env = envService.getNodeEnv();
  const server = envService.getServer();
  const port = envService.getPort();
  const _server = `${server}:${port}`;

  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('petKnow 寵知')
    .setDescription('API 文件')
    .setVersion('1.0.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
        description: '請加上 API Token',
      },
      'apiKeyAuth',
    )
    .addServer(_server, env)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true, // 開啟搜尋列
  };

  SwaggerModule.setup(swaggerPrefix, app, document, options);
}
