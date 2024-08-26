import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseResponseData, returnBaseResponse } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { Auth, GetUserFromToken, TYPE_PLATFORM } from '../auth/auth.guard';
import { ReviewEntity } from '../shared/review.entity';
import { UserEntity } from '../shared/user.entity';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { Response } from 'express';
import { BaseListResponseData } from 'src/utils.common/utils.response.common/utils.base-list.response.common';
import { ParamEntityDTO, QueryPaginationDTO } from 'src/utils.common/utils.validator.common/query-pagination';
import { Pagination } from 'src/utils.common/utils.pagination.pagination/utils.pagination';

@Auth(TYPE_PLATFORM.ADMIN, TYPE_PLATFORM.SELLER, TYPE_PLATFORM.CUSTOMER)
@ApiTags('REVIEW')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo review' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  create(@Body() createReviewDto: CreateReviewDTO, @GetUserFromToken() user: UserEntity, @Res() res: Response) {
    const data = this.reviewService.create(user, createReviewDto);
    returnBaseResponse(res, data);
  }

  @Get("")
  @ApiOperation({ summary: 'Lấy toàn bộ reviews' })
  @ApiOkResponse({ type: [ReviewEntity], description: 'Danh sách tất cả các review' })
  async getAllReviews(@Res() res: Response, @Query() query: QueryPaginationDTO, @Query('home_id') id: number){
    const pagination = new Pagination(query.page, query.limit);
     const {total_record, data} = await this.reviewService.findAllReviews(id, pagination.getOffset(), query.page, query.limit);
    const baseListResponse = new BaseListResponseData(data, query.limit, total_record);

    returnBaseResponse(res, baseListResponse);
  }

  @Post(':id/change-status')
  @ApiOperation({ summary: 'Tạo review' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  changeStatus(@Param() param: ParamEntityDTO, @Res() res: Response) {
    const data = this.reviewService.changeStatus(param.id);
    returnBaseResponse(res, data);
  }
}
