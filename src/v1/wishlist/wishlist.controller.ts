import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { returnBaseResponse } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { ParamEntityDTO, QueryPaginationDTO } from 'src/utils.common/utils.validator.common/query-pagination';
import { Auth, GetUserFromToken, TYPE_PLATFORM } from '../auth/auth.guard';
import { UserEntity } from '../user/entities/user.entity';
import { WishlistEntity } from './entities/wishlist.entity';
import { WishlistsService } from './wishlist.service';

@ApiTags('Wishlist')
@Auth(TYPE_PLATFORM.CUSTOMER, TYPE_PLATFORM.SELLER)
@Controller('wishlist')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @ApiOperation({ summary: 'Tạo mới một wishlist' })
  @ApiResponse({ status: 201, description: 'Wishlist được tạo thành công', type: WishlistEntity })
  @ApiBody({ type: WishlistEntity })
  @Post('')
  async create(@Res() res: Response, @GetUserFromToken() user: UserEntity, @Body() createWishlistDto: Partial<WishlistEntity>) {
    const data = await this.wishlistsService.create(user, createWishlistDto);
    returnBaseResponse(res, data);
  }

  @ApiOperation({ summary: 'Lấy danh sách tất cả wishlists, phân trang page limit' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [WishlistEntity] })
  @ApiQuery({ type: QueryPaginationDTO })
  @Get('')
  async findAll(@Res() res: Response, @GetUserFromToken() user: UserEntity, @Query() query: QueryPaginationDTO) {
    const data = this.wishlistsService.findAll(user, query);
    returnBaseResponse(res, data);
  }

  @ApiOperation({ summary: 'Lấy thông tin wishlist theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: WishlistEntity })
  // @ApiParam({ name: 'id', description: 'ID của wishlist', type: Number })
  @Get(':id')
  async findOne(@Res() res: Response, @GetUserFromToken() user: UserEntity, @Param() param: ParamEntityDTO) {
    const data = this.wishlistsService.findOne(user, param.id);
    returnBaseResponse(res, data);
  }

  // @ApiOperation({ summary: 'Cập nhật wishlist theo ID' })
  // @ApiResponse({ status: 200, description: 'Wishlist được cập nhật thành công', type: WishlistEntity })
  // // @ApiParam({ name: 'id', description: 'ID của wishlist', type: Number })
  // @ApiBody({ type: WishlistEntity })
  // @Post(':id/update')
  // async update(
  //   @Res() res: Response,
  //   @GetUserFromToken() user: UserEntity,
  //   @Param() param: ParamEntityDTO,
  //   @Body() updateWishlistDto: Partial<WishlistEntity>,
  // ) {
  //   // return this.wishlistsService.update(user, param.id, updateWishlistDto);
  // }

  @ApiOperation({ summary: 'Xóa wishlist theo ID' })
  @ApiResponse({ status: 204, description: 'Wishlist đã bị xóa' })
  @ApiParam({ name: 'id', description: 'ID của wishlist', type: Number })
  @Post(':id/remove')
  async remove(@Res() res: Response, @GetUserFromToken() user: UserEntity, @Param() param: ParamEntityDTO): Promise<void> {
    const data = this.wishlistsService.remove(user, param.id);
    returnBaseResponse(res, data);
  }
}
