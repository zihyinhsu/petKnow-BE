import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = response.statusCode;
    const { method, originalUrl } = request;
    console.log(`[${method.toUpperCase()} ${originalUrl}]`);
    return next.handle().pipe(
      map((data: any) => {
        let message;
        let isSuccess = false;
        if (status === HttpStatus.OK) {
          if (method.toUpperCase() === 'PATCH') {
            message = '修改成功';
          } else if (method.toUpperCase() === 'DELETE') {
            message = '刪除成功';
          }
          isSuccess = true;
        } else if (status === HttpStatus.CREATED) {
          if (originalUrl.includes('login')) {
            message = '登入成功';
          } else message = '新增成功';
          isSuccess = true;
        } else if (status === HttpStatus.NOT_ACCEPTABLE) {
          message = '錯誤的請求';
        } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
          message = '系統發生錯誤，請聯繫系統管理員';
        }
        return {
          status,
          isSuccess,
          message,
          data,
        };
      }),
    );
  }
}
