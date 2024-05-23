import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    console.log(`[${method.toUpperCase()}] ${originalUrl}`, 'Hello Request');
    next();
  }
}
