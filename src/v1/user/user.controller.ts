import { Body, Controller, Get, HttpStatus, Param, Post, Request, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseResponseData, returnBaseResponse } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { RequestWithUser } from '../shared/request-with-user.response';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { Auth, TYPE_PLATFORM } from '../auth/auth.guard';
import { BodyUpdateUserAddressDto } from './dto/body-update-user-address.dto';

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

  @ApiOperation({ summary: 'Thêm nhà vào cho danh sách yêu thích' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ type: Number, name: 'id', description: 'Id của nhà cho thuê' })
  @Get('/:id/add-wishlist')
  async addWishlist(@Param('id') id: string, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
    // return this.homeService.findOne(id);
  }

  @ApiOperation({ summary: 'Xóa nhà khỏi danh sách yêu thích' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ type: Number, name: 'id', description: 'Id của nhà cho thuê' })
  @Get('/:id/remove-wishlist')
  async removeWishlist(@Param('id') id: string, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
    // return this.homeService.findOne(id);
  }

  // get list wish-list
  @ApiOperation({ summary: 'Lấy danh sách nhà đã thêm vào danh sách yêu thích' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  // @ApiParam({ type: Number, name: 'id', description: 'Id của nhà cho thuê' })
  @Get('wishlist')
  async listWishlist(@Request() req: RequestWithUser) {
    // const data = await this.userService.listWishlist(req.user.id);
    return new BaseResponseData(200, 'OK', []);
  }

  @Auth(TYPE_PLATFORM.ADMIN, TYPE_PLATFORM.SELLER, TYPE_PLATFORM.CUSTOMER)
  //user cập nhật địa chỉ của profile
  @ApiOperation({ summary: 'Cập nhật địa chỉ của người dùng' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: BodyUpdateUserAddressDto, description: 'thông tin địa chỉ' })
  @Post('update-address')
  async updateAddress(@Request() req: RequestWithUser, @Body() body: BodyUpdateUserAddressDto, @Res() res: Response) {
    const data = await this.userService.updateAddress(req.user, body);
    returnBaseResponse(res);
  }
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
