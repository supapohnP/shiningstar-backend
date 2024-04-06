import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Role } from 'src/libs/constant/user.constant';
import { RequestWithUser } from '../strategy/jwt.strategy';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [req] = context.getArgs();
    const { user } = req as RequestWithUser;
    const allowRoles =
      this.reflector.get<Role[]>('roles', context.getHandler()) ?? [];
    if (user?.role && allowRoles.includes(user?.role)) return true;
    throw new UnauthorizedException();
  }
}
