import { Body, Controller, Get, HttpStatus, Param, Post, Query, Request, Res, UseGuards } from '@nestjs/common';
import { QueryPhone } from './dto/query-phone.dto';
import { UserService } from './user.service';
import { RequestWithUser } from '../shared/request-with-user.response';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { UserEntity } from '../shared/user.entity';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from '../auth/dto/change-password.dto';
import { Response } from 'express';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Lấy thông tin người dùng hiện tại' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ type: Number, name: 'id', description: 'id của người dùng cần lấy thông tin' })
  @Get('/:id/profile')
  async getProfile(@Request() req: RequestWithUser, @Param('id') id: number, @Res() res: Response) {
    const data = await this.userService.getProfile(req.user.id, id);
    return res.status(HttpStatus.OK).json(new BaseResponseData(HttpStatus.OK, 'OK', data));
  }

  @ApiOperation({ summary: 'Cập nhật thông tin người dùng hiện tại' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: UserEntity, description: 'thông tin của thông dùng' })
  @Post('update')
  async updateUser(@Request() req: RequestWithUser, @Body() body: Partial<UserEntity>, @Res() res: Response) {
    const data = await this.userService.updateUser(req, body);
    return res.status(HttpStatus.OK).json(new BaseResponseData(HttpStatus.OK, 'OK', data));
  }

  // @Get('find-phone')
  // async findUserByPhone(@Request() req: RequestWithUser, @Query() query: QueryPhone) {
  //   const data = await this.userService.findUserByPhone(req.user.id, query.phone);
  //   return data;
  // }

  @ApiOperation({ summary: 'Gửi yêu cầu xóa tài khoản' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  // @ApiBody({ type: UserEntity, description: '' })
  @Post('remove-account')
  async removeAccount(@Request() req: RequestWithUser, @Res() res: Response) {
    const data = await this.userService.removeAccount(req.user.id);
    return res.status(HttpStatus.OK).json(new BaseResponseData(HttpStatus.OK, 'OK'));
  }

  @ApiOperation({ summary: 'Lấy danh sách người dùng đã chặn' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @Get('list-block-user')
  async listBlockUser(@Request() req: RequestWithUser) {
    const data = await this.userService.listBlockUser(req.user.id);
    return new BaseResponseData(200, 'OK', data);
  }

  // @Post('block-user/:target_id')
  // async blockUser(@Request() req: RequestWithUser, @Param('target_id') target_id: number) {
  //   const data = await this.userService.blockUser(req.user.id, target_id);
  //   return new BaseResponseData(200, 'OK', data);
  // }

  // @Post('remove-block-user/:target_id')
  // async removeBlockUser(@Request() req: RequestWithUser, @Param('target_id') target_id: number) {
  //   const data = await this.userService.removeBlockUser(req.user.id, target_id);
  //   return new BaseResponseData(200, 'OK', data);
  // }

  // @Post('sync-phone')
  // async syncPhone(@Request() req: RequestWithUser, @Body() body: any) {
  //   const data = await this.userService.syncPhone(req.user.id, body);
  //   return new BaseResponseData(200, 'OK', data);
  // }

  // @Get('search')
  // async searchUser(@Request() req: RequestWithUser, @Query() query: number) {
  //   const data = await this.userService.searchUser(req.user.id, query);
  //   return new BaseResponseData(200, 'OK', data);
  // }
}
