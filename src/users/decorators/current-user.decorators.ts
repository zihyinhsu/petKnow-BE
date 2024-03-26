import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// 自定義裝飾器
export const CurrentUser = createParamDecorator((_data: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
