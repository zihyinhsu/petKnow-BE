import { AuthService } from './auth.service';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
export class RoleGuard implements CanActivate {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { user, method, path } = request;
    const { role } = user;
    // console.log('this.authService', this.authService);
    const action = this.authService.mappingAction(method);
    console.log(
      'action',
      action,
      await this.authService.checkPermission(role, path, action),
    );
    return await this.authService.checkPermission(role, path, action);
  }
}
