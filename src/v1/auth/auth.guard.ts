import {
  applyDecorators,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { Request } from 'express';
import { Role } from 'src/utils.common/utils.enum.common/utils.user.enum';
import { DataSource } from 'typeorm';
import { UserEntity } from '../shared/user.entity';

import { IS_PUBLIC_KEY, ROLES_KEY } from './roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    // private authService: AuthService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPlatforms = this.reflector.getAllAndOverride<TYPE_PLATFORM[]>(PLATFORM_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPlatforms || requiredPlatforms.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException('Token không tồn tại', HttpStatus.UNAUTHORIZED);
    }

    let payload;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new HttpException('Xác thực user không thành công', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.dataSource.getRepository(UserEntity).findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new HttpException('Người dùng không tồn tại', HttpStatus.UNAUTHORIZED);
    }

    console.log('locser -> file: auth.guard.ts:78 -> canActivate -> payload:', user);

    // const hasAccess = await this.checkTokenActive(payload.id, token);

    // if (!hasAccess) {
    //   throw new HttpException('Xác thực user không thành công', HttpStatus.UNAUTHORIZED);
    // }
    console.log('locser -> file: auth.guard.ts:91 -> canActivate -> requiredPlatforms, payload.type:', requiredPlatforms, payload.type);

    if (this.checkPlatforms(requiredPlatforms, user.type)) throw new HttpException('Người dùng không tồn tại', HttpStatus.UNAUTHORIZED);

    // const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    // if (!requiredRoles) {
    // } else {
    //   if (!requiredRoles.includes(payload?.role)) {
    //     throw new HttpException('Không có quyền truy cập', HttpStatus.FORBIDDEN);
    //   }
    // }

    request['user'] = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async checkTokenActive(userId: number, token: string) {
    const userToken = await this.dataSource.getRepository(UserEntity).findOne({
      where: {
        id: userId,
        // token: token,
        // expired_at: { $gt: +moment() },
      },
    });

    if (!userToken) return false;

    return true;
  }

  private checkPlatforms(platforms: TYPE_PLATFORM[], type: number) {
    if (!platforms || platforms.length === 0) return false;
    return !platforms.includes(type);
  }
}

export const GetUserFromToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user: UserEntity = request['user'];

  return user;
});

const PLATFORM_KEY = 'platforms';
export function Auth(...platforms: TYPE_PLATFORM[]) {
  return applyDecorators(SetMetadata(PLATFORM_KEY, platforms), UseGuards(AuthGuard), ApiBearerAuth());
}

export enum TYPE_PLATFORM {
  ADMIN = 1,
  SELLER = 2,
  CUSTOMER = 3,
}
