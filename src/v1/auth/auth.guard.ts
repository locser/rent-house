import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { Request } from 'express';
import { Role } from 'src/utils.common/utils.enum.common/utils.user.enum';
import { DataSource } from 'typeorm';
import { UserEntity } from '../shared';
import { IS_PUBLIC_KEY, ROLES_KEY } from './roles.decorator';

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
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    let payload;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new HttpException('Xác thực user không thành công', HttpStatus.UNAUTHORIZED);
    }

    const hasAccess = await this.checkTokenActive(payload.id, token);

    if (!hasAccess) {
      throw new HttpException('Xác thực user không thành công', HttpStatus.UNAUTHORIZED);
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
    } else {
      if (!requiredRoles.includes(payload?.role)) {
        throw new HttpException('Không có quyền truy cập', HttpStatus.FORBIDDEN);
      }
    }

    request['user'] = payload;

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
}
