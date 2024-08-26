import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res } from '@nestjs/common';
import { RequestWithUser } from '../shared/request-with-user.response';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignUpDto } from './dto/user-sign-up.dto';
import { Public } from './roles.decorator';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { LoginDto } from './dto/user-sign-in.dto';
import { UserEntity } from '../shared/user.entity';

@ApiTags('Auth - xác thực')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Xác thực người dùng' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: LoginDto })
  @Post('sign-in')
  async signIn(@Body() body: LoginDto, @Res() res: Response) {
    console.log('AuthController ~ signIn ~ body:', body);
    const data = await this.authService.signIn(body);
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', data));
  }

  @ApiOperation({ summary: 'đăng xuất người dùng' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @Get('log-out')
  async logout(@Request() req: RequestWithUser) {
    return await this.authService.logout(req.user.id);
  }

  @ApiOperation({ summary: 'đăng ký người dùng' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: SignUpDto })
  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const data = await this.authService.signUp(signUpDto);
    return res.status(HttpStatus.OK).send(new BaseResponseData());
  }

  @ApiOperation({ summary: 'đổi mật khẩu người dùng' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: ChangePasswordDto })
  @Post('change-password')
  async changePassword(@Request() req: RequestWithUser, @Body() changePasswordDto: ChangePasswordDto, @Res() res: Response) {
    const data = await this.authService.changePassword(req.user.id, changePasswordDto);
    return res.status(HttpStatus.OK).send(new BaseResponseData());
  }

  @ApiOperation({ summary: 'lấy lại mật khẩu người dùng' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: ChangePasswordDto })
  @Public()
  @Post('reset-password')
  async resetPassWord(@Body() body: Partial<UserEntity>, @Res() res: Response) {
    const data = await this.authService.resetPassword(body);
    return res.status(HttpStatus.OK).send(new BaseResponseData());
  }
}
