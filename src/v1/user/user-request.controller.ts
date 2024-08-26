import { Body, Controller, Get, HttpStatus, Param, Post, Request, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { RequestWithUser } from '../shared/request-with-user.response';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user-requests')
export class UserRequestController {
  constructor(private readonly userService: UserService) {}

  // tạo request - yêu cầu mong muốn tìm nhà thuê của người dùng
  @ApiOperation({ summary: 'Gửi yêu cầu xóa tài khoản' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  // @ApiBody({ type: UserEntity, description: '' })
  @Post('request')
  async removeAccount(@Request() req: RequestWithUser, @Res() res: Response) {
    const data = await this.userService.removeAccount(req.user.id);
    return res.status(HttpStatus.OK).json(new BaseResponseData(HttpStatus.OK, 'OK'));
  }
}
