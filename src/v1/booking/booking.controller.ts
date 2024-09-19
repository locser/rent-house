import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Pagination } from 'src/utils.common/utils.pagination.pagination/utils.pagination';
import { BaseListResponseData } from 'src/utils.common/utils.response.common/utils.base-list.response.common';
import { BaseResponseData, returnBaseResponse } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { ParamEntityDTO, QueryPaginationDTO } from 'src/utils.common/utils.validator.common/query-pagination';
import { Auth, GetUserFromToken, TYPE_PLATFORM } from '../auth/auth.guard';
import { BodyBookingDto } from '../home/dto/body-booking.dto';
import { UserEntity } from '../user/entities/user.entity';
import { BookingService } from './booking.service';
import { BodyUpdateStatusDto } from './dto/body-update-status.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from 'src/utils.common/utils.enum.common/utils.user.enum';

@Auth(TYPE_PLATFORM.ADMIN, TYPE_PLATFORM.SELLER, TYPE_PLATFORM.CUSTOMER)
@ApiTags('BOOKING')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // lấy danh sách các booking thuê nhà của bản thân cho người thuê
  @ApiOperation({ summary: 'Lấy danh sách các booking thuê nhà của bản thân' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @Post('/')
  async getMyBookings(@GetUserFromToken() user: UserEntity, @Query() query: QueryPaginationDTO, @Res() res: Response) {
    const pagination = new Pagination(query.page, query.limit);
    const data = await this.bookingService.getMyBookings(user, pagination);

    const baseListResponse = new BaseListResponseData(data.list, query.limit, data.total_record);

    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', baseListResponse));
  }

  // @ApiOperation({ summary: 'Tạo booking thuê nhà, lần đầu chỉ có hẹn gặp, sau hẹn gặp mới -> booking thuê nhà' })
  // @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  // @ApiBody({ type: CreateBookingDto })
  // @Post()
  // @Roles([Role.ADMIN, Role.SENDER])
  // async create(@Body() createBookingDto: CreateBookingDto, @Res() res: Response) {
  //   const data = await this.bookingService.create(createBookingDto);
  //   return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', data));
  // }

  @ApiOperation({ summary: 'Cập nhật thông tin booking thuê nhà' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ name: 'id', description: 'Mã booking' })
  @ApiBody({ type: CreateBookingDto })
  @Post('/:id')
  // @Roles([Role.ADMIN, Role.SENDER])
  async update(
    @GetUserFromToken() user: UserEntity,
    @Param() param: ParamEntityDTO,
    @Body() createBookingDto: BodyBookingDto,
    @Res() res: Response,
  ) {
    const data = await this.bookingService.updateEntity(user, param.id, createBookingDto);
    returnBaseResponse(res, data);
    // return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', data));
  }

  @ApiOperation({ summary: 'Tạo hợp đồng thuê nhà bởi người cho thuê nhà (người đăng tin)' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ name: 'id', description: 'Thông tin của booking thuê nhà' })
  @ApiBody({ type: BodyUpdateStatusDto })
  @Post('/:id/create-contract')
  @Roles([Role.ADMIN, Role.SENDER])
  async createContract(
    @GetUserFromToken() user: UserEntity,
    @Param() param: ParamEntityDTO,
    // @Body() body: BodyUpdateStatusDto,
    @Res() res: Response,
  ) {
    const data = await this.bookingService.createContract(user, param.id);
    returnBaseResponse(res, data);
  }

  @ApiOperation({ summary: 'Lấy thông tin chi tiết booking thuê nhà' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ name: 'id', description: 'Mã booking' })
  // @ApiBody({ type: any })
  @Get('/:id')
  // @Roles([Role.ADMIN, Role.SENDER])
  async getDetail(@GetUserFromToken() user: UserEntity, @Param() param: ParamEntityDTO, @Res() res: Response) {
    const data = await this.bookingService.getDetail(user, param.id);

    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', data));
  }

  @ApiOperation({ summary: 'Cập nhật trạng thái booking thuê nhà (chỉ dành cho trạng thái)' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ name: 'id', description: 'Mã booking' })
  @ApiBody({ type: BodyUpdateStatusDto })
  @Post('/:id/update-status')
  // @Roles([Role.ADMIN, Role.SENDER])
  async updateStatus(
    @GetUserFromToken() user: UserEntity,
    @Param() param: ParamEntityDTO,
    @Body() body: BodyUpdateStatusDto,
    @Res() res: Response,
  ) {
    const data = await this.bookingService.updateStatus(user, param.id, body.status);
    returnBaseResponse(res, data);
  }
}
