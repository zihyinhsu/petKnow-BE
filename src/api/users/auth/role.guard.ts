import { UserService } from 'api2/user/user.service';
// import { AuthService } from './auth.service';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
export class RoleGuard implements CanActivate {
  constructor(@Inject(UserService) private UserService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { user, method, path } = request;
    const { role } = user;
    const action = this.UserService.mappingAction(method);

    return await this.UserService.checkPermission(role, path, action);
  }
}
