import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Pagination } from 'src/utils.common/utils.pagination.pagination/utils.pagination';
import { BaseResponseData, returnBaseResponse } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { ParamEntityDTO } from 'src/utils.common/utils.validator.common/query-pagination';
import { Auth, GetUserFromToken, TYPE_PLATFORM } from '../auth/auth.guard';
import { UserEntity } from '../shared/user.entity';
import { CreateHomeDto } from './dto/create-home.dto';
import { QueryGetHomePaginationDto } from './dto/query-get-pagination.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { HomeService } from './home.service';
import { DetailHomeResponse } from './response/detail-home.response';
import { HomeResponse } from './response/home-response.response';
import { BodyBookingDto } from './dto/body-booking.dto';

@Auth(TYPE_PLATFORM.ADMIN, TYPE_PLATFORM.SELLER)
@ApiTags('Home')
@Controller('homes')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiOperation({ summary: 'Tạo nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: CreateHomeDto })
  @Post('')
  async create(@GetUserFromToken() user: UserEntity, @Body() createHomeDto: CreateHomeDto, @Res() res: Response) {
    const data = await this.homeService.create(createHomeDto, user);

    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', { id: data.id }));
  }

  @ApiOperation({ summary: 'Lấy danh sách nhà cho thuê có phân trang ' })
  @ApiOkResponse({ type: [HomeResponse], status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Get('')
  async getPagination(@Query() query: QueryGetHomePaginationDto, @Res() res: Response) {
    const pagination = new Pagination(query.page, query.limit);
    const data = await this.homeService.findPagination(pagination);

    returnBaseResponse(
      res,
      data.map((item) => new HomeResponse(item)),
    );
  }

  @ApiOperation({ summary: 'Lấy danh sách nhà cho thuê có phân trang hiện đang top bao nhiêu' })
  @ApiOkResponse({ type: [HomeResponse], status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Get('top-company')
  async getTopHome(@Query() createHomeDto: CreateHomeDto, @Res() res: Response) {
    const data = await this.homeService.getTopHome();

    returnBaseResponse(
      res,
      data.map((item) => new HomeResponse(item)),
    );
  }

  @ApiOperation({ summary: 'Lấy thông tin chi tiết nhà cho thuê' })
  @ApiOkResponse({ type: DetailHomeResponse, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Get(':id')
  async getDetail(@Param() param: ParamEntityDTO, @Res() res: Response) {
    const data = await this.homeService.getDetail(param.id);
    returnBaseResponse(res, new DetailHomeResponse(data));
  }

  @ApiOperation({ summary: 'book nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ name: 'id', type: Number })
  // @ApiBody({ type: UpdateHomeDto })
  @Post(':id/booking')
  async booking(@Param() param: ParamEntityDTO, @GetUserFromToken() user: UserEntity, @Body() body: BodyBookingDto, @Res() res: Response) {
    const data = await this.homeService.booking(param.id, user, body);

    returnBaseResponse(res, data);
  }

  @ApiOperation({ summary: 'Cập nhật thông tin nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateHomeDto })
  @Post(':id')
  async update(@Param() param: ParamEntityDTO, @Body() updateHomeDto: CreateHomeDto, @Res() res: Response) {
    // return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
    const data = await this.homeService.updateHome(param.id, updateHomeDto);

    returnBaseResponse(res, new HomeResponse(data));
  }

  @ApiOperation({ summary: 'Xóa nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ name: 'id', type: Number })
  @Post(':id')
  // @Roles([Role.ADMIN, Role.SENDER])
  async remove(@GetUserFromToken() user: UserEntity, @Param() param: ParamEntityDTO, @Res() res: Response) {
    const data = await this.homeService.remove(param.id, user.id);

    returnBaseResponse(res);
  }

  @ApiOperation({ summary: 'Tìm kiếm nhà cho thuê chưa làm' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Get('search')
  async search(@Query() createHomeDto: CreateHomeDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
    // return this.homeService.search(createHomeDto);
  }
}
