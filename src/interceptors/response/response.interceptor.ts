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
        if (originalUrl.includes('login')) {
          if (data.token) {
            message = '登入成功';
            isSuccess = true;
          } else {
            message = '登入失敗';
            data = undefined;
          }
        } else if (status === HttpStatus.OK) {
          if (method.toUpperCase() === 'PATCH') {
            message = '修改成功';
          } else if (method.toUpperCase() === 'DELETE') {
            message = '刪除成功';
          }
          isSuccess = true;
        } else if (status === HttpStatus.CREATED) {
          message = '新增成功';
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
          data:
            method.toUpperCase() === 'GET' || originalUrl.includes('login')
              ? data
              : undefined,
        };
      }),
    );
  }
}
