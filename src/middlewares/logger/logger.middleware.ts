import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, _res: any, next: () => void) {
    const { method, originalUrl } = req;
    console.log(`[${method.toUpperCase()}] ${originalUrl}`, 'Hello Request');
    next();
  }
}
