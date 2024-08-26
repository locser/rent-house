import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseResponseData, returnBaseResponse } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { ParamEntityDTO } from 'src/utils.common/utils.validator.common/query-pagination';
import { Auth, TYPE_PLATFORM } from '../auth/auth.guard';
import { CreateHomeDto } from './dto/create-home.dto';
import { CreateServiceDto } from './dto/create-services.dto';
import { HomeService } from './home.service';
import { BodyAssignServicesDto } from './dto/body-assign-services.dto';

@Auth(TYPE_PLATFORM.ADMIN, TYPE_PLATFORM.SELLER)
// @ApiTags('dịch vụ trong nhà cho thuê')
@ApiTags('Home')
@Controller('services')
export class ServiceController {
  constructor(private readonly homeService: HomeService) {}

  // tạo services trong nhà cho thuê
  @ApiOperation({ summary: 'Tạo services cho nhà thuê, có cách service nào' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Auth(TYPE_PLATFORM.ADMIN)
  @Post('')
  async createService(@Body() body: CreateServiceDto, @Res() res: Response) {
    const data = await this.homeService.createService(body);
    returnBaseResponse(res, data);
  }

  // gán services cho nhà cho thuê
  @ApiOperation({ summary: 'Gán services cho nhà thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Auth(TYPE_PLATFORM.SELLER, TYPE_PLATFORM.ADMIN)
  @Post('/assign')
  async assignServices(@Body() body: BodyAssignServicesDto, @Res() res: Response) {
    const data = await this.homeService.assignServices(body.home_id, body);

    returnBaseResponse(res);
  }

  // cập nhật services cho nhà cho thuê
  @ApiOperation({ summary: 'Cập nhật services cho nhà thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Auth(TYPE_PLATFORM.SELLER, TYPE_PLATFORM.ADMIN)
  @Post('/:id/update')
  async updateServices(@Param() param: ParamEntityDTO, @Body() body: CreateServiceDto, @Res() res: Response) {
    const data = await this.homeService.updateServices(param.id, body);
    returnBaseResponse(res, data);
  }

  // xóa services trong nhà cho thuê
  @ApiOperation({ summary: 'Xóa services trong nhà cho thuê, xóa hẳn khỏi hệ thống, không phải bỏ gán trong nhà thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Auth(TYPE_PLATFORM.ADMIN)
  @Post('/:id/delete')
  async deleteServices(@Param() param: ParamEntityDTO, @Res() res: Response) {
    await this.homeService.deleteServices(param.id);
    returnBaseResponse(res);
  }

  // lấy danh sách services trong nhà cho thuê
  @ApiOperation({ summary: 'Lấy danh sách services trong nhà cho thuê' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiQuery({ type: CreateHomeDto })
  @Auth(TYPE_PLATFORM.SELLER, TYPE_PLATFORM.ADMIN)
  @Post('/list')
  async listServices(@Res() res: Response) {
    const data = await this.homeService.listServices();
    returnBaseResponse(res, data);
  }
}
