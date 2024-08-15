import { Body, Controller, HttpCode, HttpStatus, Post, Request, Res } from '@nestjs/common';
import { UserEntity } from '../shared';
import { RequestWithUser } from '../shared/request-with-user.response';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignUpDto } from './dto/user-sign-up.dto';
import { Public } from './roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { LoginDto } from './dto/user-sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  async signIn(@Body() body: LoginDto) {
    console.log('AuthController ~ signIn ~ body:', body);
    const data = await this.authService.signIn(body);
    return data;
  }

  // @Get('log-out')
  // async logout(@Request() req: RequestWithUser) {
  //   return await this.authService.logout(req.user.id.toString());
  // }

  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const data = await this.authService.signUp(signUpDto);
    return res.status(HttpStatus.OK).send(new BaseResponseData());
  }

  @Post('change-password')
  async changePassword(@Request() req: RequestWithUser, @Body() changePasswordDto: ChangePasswordDto, @Res() res: Response) {
    const data = await this.authService.changePassword(req.user.id, changePasswordDto);
    return res.status(HttpStatus.OK).send(new BaseResponseData());
  }

  @Public()
  @Post('reset-password')
  async resetPassWord(@Body() body: Partial<UserEntity>, @Res() res: Response) {
    const data = await this.authService.resetPassword(body);
    return res.status(HttpStatus.OK).send(new BaseResponseData());
  }
}
