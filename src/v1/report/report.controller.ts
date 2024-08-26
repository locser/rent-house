import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponseData, returnBaseResponse } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { CreateReportDTO } from './dto/create.dto';
import { Auth, GetUserFromToken, TYPE_PLATFORM } from '../auth/auth.guard';
import { UserEntity } from '../shared/user.entity';
import { ReportEntity } from '../shared/report.entity';
import { ParamEntityDTO, QueryPaginationDTO } from 'src/utils.common/utils.validator.common/query-pagination';
import { Pagination } from 'src/utils.common/utils.pagination.pagination/utils.pagination';
import { BaseListResponseData } from 'src/utils.common/utils.response.common/utils.base-list.response.common';
import { Response } from 'express';

@Auth(TYPE_PLATFORM.ADMIN, TYPE_PLATFORM.SELLER, TYPE_PLATFORM.CUSTOMER)
@ApiTags('REPORT')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo report' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  create(@Body() createReportDTO: CreateReportDTO, @GetUserFromToken() user: UserEntity, @Res() res: Response) {
    const data = this.reportService.create(user, createReportDTO);
    returnBaseResponse(res, data);
  }

  @Get("")
  @ApiOperation({ summary: 'Lấy toàn bộ reports' })
  @ApiOkResponse({ type: [ReportEntity], description: 'Danh sách tất cả các report' })
  async getAllReports(@Res() res: Response, @Query() query: QueryPaginationDTO, @Query('home_id') id: number){
    const pagination = new Pagination(query.page, query.limit);
     const {total_record, data} = await this.reportService.findAllReport(id, pagination.getOffset(), query.page, query.limit);
    const baseListResponse = new BaseListResponseData(data, query.limit, total_record);

    returnBaseResponse(res, baseListResponse);
  }

  @Post(':id/change-status')
  @ApiOperation({ summary: 'Tạo report' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  changeStatus(@Param() param: ParamEntityDTO, @Res() res: Response) {
    const data = this.reportService.changeStatus(param.id);
    returnBaseResponse(res, data);
  }
}
