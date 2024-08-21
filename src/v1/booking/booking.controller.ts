import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/utils.common/utils.enum.common/utils.user.enum';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { Roles } from '../auth/roles.decorator';
import { CreateHomeDto } from '../home/dto/create-home.dto';
import { Response } from 'express';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('Home')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Tạo booking thuê nhà' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: CreateBookingDto })
  @Post()
  @Roles([Role.ADMIN, Role.SENDER])
  async create(@Body() createBookingDto: CreateBookingDto, @Res() res: Response) {
    const data = await this.bookingService.create(createBookingDto);

    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', data));
  }

  @ApiOperation({ summary: 'Cập nhật thông tin booking thuê nhà' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: UpdateBookingDto })
  @Post('/:id')
  @Roles([Role.ADMIN, Role.SENDER])
  async update(@Body() createBookingDto: CreateBookingDto, @Res() res: Response) {
    const data = await this.bookingService.create(createBookingDto);

    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', data));
  }

  @ApiOperation({ summary: 'Cập nhật trạng thái booking thuê nhà (chỉ dành cho trạng thái)' })
  @ApiOkResponse({ type: BaseResponseData, status: HttpStatus.OK })
  @ApiBody({ type: UpdateStatusBookingDto })
  @Post('/:id/update-status')
  @Roles([Role.ADMIN, Role.SENDER])
  async updateStatus(@Body() createBookingDto: CreateBookingDto, @Res() res: Response) {
    const data = await this.bookingService.create(createBookingDto);

    return res.status(HttpStatus.OK).send(new BaseResponseData(HttpStatus.OK, 'OK', data));
  }
}
