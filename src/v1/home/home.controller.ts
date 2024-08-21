import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Role } from 'src/utils.common/utils.enum.common/utils.user.enum';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { Roles } from '../auth/roles.decorator';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { HomeService } from './home.service';

@ApiTags('Home')
@Controller('homes')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiOperation({ summary: 'Tạo nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: CreateHomeDto })
  @Post()
  @Roles([Role.ADMIN, Role.SENDER])
  async create(@Body() createHomeDto: CreateHomeDto, @Res() res: Response) {
    const data = await this.homeService.create(createHomeDto);
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));

    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', data));
  }

  @ApiOperation({ summary: 'Lấy danh sách nhà cho thuê có phân trang ' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Get()
  async getPagination(@Query() createHomeDto: CreateHomeDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
    return this.homeService.findAll();
  }

  @ApiOperation({ summary: 'Lấy danh sách nhà cho thuê có phân trang hiện đang top bao nhiêu' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Get('top-company')
  getTopHome(@Query() createHomeDto: CreateHomeDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
  }

  @ApiOperation({ summary: 'Lấy thông tin chi tiết nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Get(':id')
  async getDetail(@Param('id') id: string, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
    // return this.homeService.findOne(id);
  }

  @ApiOperation({ summary: 'Cập nhật thông tin nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateHomeDto })
  @Post(':id')
  @Roles([Role.ADMIN, Role.SENDER])
  async update(@Param('id') id: number, @Body() updateHomeDto: UpdateHomeDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
    // return this.homeService.update(id, updateHomeDto);
  }

  @ApiOperation({ summary: 'Xóa nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiParam({ name: 'id', type: Number })
  @Post(':id')
  @Roles([Role.ADMIN, Role.SENDER])
  async remove(@Param('id') id: number, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
    // return this.homeService.remove(id);
  }

  @ApiOperation({ summary: 'Tìm kiếm nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Get('search')
  async search(@Query() createHomeDto: CreateHomeDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.BAD_REQUEST, 'Chưa hoàn thiện API'));
    // return this.homeService.search(createHomeDto);
  }
}
