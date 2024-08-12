import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { QueryPhone } from './dto/query-phone.dto';
import { UserService } from './user.service';
import { RequestWithUser } from '../shared/request-with-user.response';
import { UserEntity } from '../shared';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req: RequestWithUser, @Query('id') id: number) {
    const data = await this.userService.getProfile(req.user.id, id);
    return data;
  }

  @Post('update')
  async updateUser(@Request() req: RequestWithUser, @Body() body: Partial<UserEntity>) {
    const data = await this.userService.updateUser(req, body);
    return data;
  }

  // @Get('find-phone')
  // async findUserByPhone(@Request() req: RequestWithUser, @Query() query: QueryPhone) {
  //   const data = await this.userService.findUserByPhone(req.user.id, query.phone);
  //   return data;
  // }

  @Post('remove-account')
  async removeAccount(@Request() req: RequestWithUser) {
    const data = await this.userService.removeAccount(req.user.id);
    return data;
  }

  @Get('list-block-user')
  async listBlockUser(@Request() req: RequestWithUser) {
    const data = await this.userService.listBlockUser(req.user.id);
    return new BaseResponseData(200, 'OK', data);
  }

  @Post('block-user/:targetid')
  async blockUser(@Request() req: RequestWithUser, @Param('targetid') targetid: number) {
    const data = await this.userService.blockUser(req.user.id, targetid);
    return new BaseResponseData(200, 'OK', data);
  }

  @Post('remove-block-user/:targetid')
  async removeBlockUser(@Request() req: RequestWithUser, @Param('targetid') targetid: number) {
    const data = await this.userService.removeBlockUser(req.user.id, targetid);
    return new BaseResponseData(200, 'OK', data);
  }

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
