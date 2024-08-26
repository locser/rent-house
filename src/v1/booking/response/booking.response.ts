import { HomeEntity } from 'src/v1/home/entities/home.entity';
import { BookingEntity } from '../entities/booking.entity';
import { BaseUserResponse } from './user.response';
import { HomeResponse } from 'src/v1/home/response/home-response.response';
import { UserEntity } from 'src/v1/user/entities/user.entity';
import { UtilsTime } from 'src/utils.common/utils.time.common/utils.time.common';

export class BookingResponse {
  id: number;
  home: HomeResponse;
  user_booking: BaseUserResponse;
  owner_home: BaseUserResponse;
  home_type: number;
  payment_id: number;
  // booking_detail_option: string;
  booking_date: string;
  home_ready_date: string;
  note: string;
  booking_detail: string;
  payment_status: number;
  is_send_mail: number;
  total_price: number;
  status: number;
  created_at: string;
  updated_at: string;

  constructor(booking: BookingEntity, home: HomeEntity, user_booking: UserEntity, owner_home: UserEntity) {
    this.id = booking.id || 0;
    this.home = new HomeResponse(home);
    this.user_booking = new BaseUserResponse(user_booking);
    this.owner_home = new BaseUserResponse(owner_home);
    this.total_price = Number(booking.total_price) || 0;
    this.status = booking.status || 0;
    this.created_at = UtilsTime.formatDateTimeVNToString(booking.created_at) || '';
    this.updated_at = UtilsTime.formatDateTimeVNToString(booking.updated_at) || '';
    this.home_type = booking.home_type || 0;
    this.payment_id = booking.payment_id || 0;
    // this.booking_detail_option = booking.booking_detail || '';
    this.booking_date = UtilsTime.formatDateTimeVNToString(booking.booking_date) || '';
    this.home_ready_date = UtilsTime.formatDateTimeVNToString(booking.home_ready_date) || '';
    this.note = booking.note || '';
    this.booking_detail = booking.booking_detail || '';
    this.payment_status = booking.payment_status || 0;
    this.is_send_mail = booking.is_send_mail || 0;
  }
}
