import * as moment from 'moment-timezone';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionResponseDetail } from '../utils.exception.common/utils.exception.common';

export class UtilsTime {
  /**
   * Lấy thời gian hiện tại theo múi giờ "Asia/Ho_Chi_Minh" với định dạng "YYYY-MM-DD HH:mm:ss".
   * @returns Chuỗi thời gian hiện tại.
   */
  static now(): string {
    return moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * Lấy ngày hiện tại theo múi giờ "Asia/Ho_Chi_Minh" với định dạng "YYYY-MM-DD".
   * @returns Chuỗi thời gian hiện tại.
   */
  static today(): string {
    return moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
  }

  /**
   * Lấy thời gian hiện tại cộng thêm 5 phút theo múi giờ "Asia/Ho_Chi_Minh" với định dạng "YYYY-MM-DD HH:mm:ss".
   * @returns Chuỗi thời gian hiện tại cộng thêm 5 phút.
   */
  static fiveMinutesLater(): string {
    return moment().tz('Asia/Ho_Chi_Minh').add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * Chuyển đổi đối tượng Date từ cơ sở dữ liệu thành chuỗi định dạng "YYYY-MM-DD HH:mm:ss".
   * @param dateTime Đối tượng Date cần chuyển đổi.
   * @returns Chuỗi ngày giờ đã được chuyển đổi.
   */
  static convertDatabaseDatetimeToString(dateTime: Date): string {
    return moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * Chuyển đổi đối tượng Date từ cơ sở dữ liệu thành chuỗi định dạng "YYYY-MM-DD".
   * @param dateTime Đối tượng Date cần chuyển đổi.
   * @returns Chuỗi ngày đã được chuyển đổi.
   */
  static convertDatabaseDateToString(dateTime: Date): string {
    return moment(dateTime).format('YYYY-MM-DD');
  }

  /**
   * Chuyển đổi đối tượng Date từ cơ sở dữ liệu thành chuỗi định dạng "DD/MM/YYYY HH:mm:ss".
   * @param dateTime Đối tượng Date cần chuyển đổi.
   * @returns Chuỗi ngày giờ đã được chuyển đổi.
   */
  static convertDatabaseTimeToClientDatetime(dateTime: Date): string {
    return moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
  }

  /**
   * Chuyển đổi đối tượng Date từ cơ sở dữ liệu thành chuỗi định dạng "DD/MM/YYYY".
   * @param dateTime Đối tượng Date cần chuyển đổi.
   * @returns Chuỗi ngày đã được chuyển đổi.
   */
  static convertDatabaseDateToClientDate(dateTime: Date): string {
    return moment(dateTime, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }

  /**
   * Chuyển đổi chuỗi ngày từ định dạng "DD/MM/YYYY" sang định dạng "YYYY-MM-DD".
   * @param dateTime Chuỗi ngày cần chuyển đổi.
   * @returns Chuỗi ngày đã được chuyển đổi.
   */
  static convertClientDateToDatabaseDate(dateTime: string): string {
    return moment(dateTime, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }

  /**
   * Chuyển đổi chuỗi ngày giờ từ định dạng "DD/MM/YYYY HH:mm:ss" sang định dạng "YYYY-MM-DD HH:mm:ss".
   * @param dateTime Chuỗi ngày giờ cần chuyển đổi.
   * @returns Chuỗi ngày giờ đã được chuyển đổi.
   */
  static convertClientDatetimeToDatabaseDatetime(dateTime: string): string {
    return moment(dateTime, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * Kiểm tra tính hợp lệ của chuỗi ngày giờ với định dạng "DD/MM/YYYY HH:mm:ss".
   * @param dateTime Chuỗi ngày giờ cần kiểm tra.
   * @returns true nếu chuỗi ngày giờ hợp lệ, ngược lại ném ngoại lệ HttpException.
   */
  static isValidClientDatetime(dateTime: string): boolean {
    // Định dạng ngày giờ cần kiểm tra
    const format: string = 'DD/MM/YYYY HH:mm:ss';

    // Kiểm tra xem dateTime có đúng định dạng và hợp lệ hay không
    const isValid: boolean = moment(dateTime, format, true).isValid();

    if (!isValid) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Ngày giờ đã truyền vào ${dateTime} không đúng định dạng DD/MM/YYYY HH:mm:ss, vui lòng kiểm tra lại!`,
        ),
        HttpStatus.OK,
      );
    }

    return isValid;
  }

  /**
   * Kiểm tra tính hợp lệ của chuỗi ngày với định dạng "DD/MM/YYYY".
   * @param dateTime Chuỗi ngày cần kiểm tra.
   * @returns true nếu chuỗi ngày hợp lệ, ngược lại ném ngoại lệ HttpException.
   */
  static isValidClientDate(dateTime: string): boolean {
    // Định dạng ngày giờ cần kiểm tra
    const format: string = 'DD/MM/YYYY';

    // Kiểm tra xem dateTime có đúng định dạng và hợp lệ hay không
    const isValid: boolean = moment(dateTime, format, true).isValid();

    if (!isValid) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Ngày giờ đã truyền vào ${dateTime} không đúng định dạng DD/MM/YYYY, vui lòng kiểm tra lại!`,
        ),
        HttpStatus.OK,
      );
    }

    return isValid;
  }

  /**
   * So sánh hai chuỗi ngày với định dạng YYYY-MM-DD.
   * @param date1 Chuỗi ngày thứ nhất cần so sánh.
   * @param date2 Chuỗi ngày thứ hai cần so sánh.
   * @returns -1 nếu date1 trước date2, 1 nếu date1 sau date2, 0 nếu hai ngày bằng nhau.
   * @throws HttpException nếu bất kỳ chuỗi ngày nào không hợp lệ.
   */
  static compareDate(date1: string, date2: string): number {
    const format: string = 'YYYY-MM-DD';

    if (!moment(date1, format, true).isValid() || !moment(date2, format, true).isValid()) {
      throw new HttpException(
        new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, `Ngày không đúng định dạng YYYY-MM-DD, vui lòng kiểm tra lại!`),
        HttpStatus.OK,
      );
    }

    const d1 = moment(date1, format);
    const d2 = moment(date2, format);

    if (d1.isBefore(d2)) return -1;
    if (d1.isAfter(d2)) return 1;
    return 0;
  }

  /**
   * So sánh hai chuỗi ngày giờ với định dạng YYYY-MM-DD HH:mm:ss.
   * @param datetime1 Chuỗi ngày giờ thứ nhất cần so sánh.
   * @param datetime2 Chuỗi ngày giờ thứ hai cần so sánh.
   * @returns -1 nếu datetime1 trước datetime2, 1 nếu datetime1 sau datetime2, 0 nếu hai ngày giờ bằng nhau.
   * @throws HttpException nếu bất kỳ chuỗi ngày giờ nào không hợp lệ.
   */
  static compareDatetime(datetime1: string, datetime2: string): number {
    const format: string = 'YYYY-MM-DD HH:mm:ss';

    if (!moment(datetime1, format, true).isValid() || !moment(datetime2, format, true).isValid()) {
      throw new HttpException(
        new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, `Ngày giờ không đúng định dạng YYYY-MM-DD HH:mm:ss, vui lòng kiểm tra lại!`),
        HttpStatus.OK,
      );
    }

    const dt1 = moment(datetime1, format);
    const dt2 = moment(datetime2, format);

    if (dt1.isBefore(dt2)) return -1;
    if (dt1.isAfter(dt2)) return 1;
    return 0;
  }

  /**
   * Cộng một số ngày vào ngày cho trước với định dạng YYYY-MM-DD.
   * @param date Chuỗi ngày với định dạng YYYY-MM-DD.
   * @param days Số ngày muốn cộng vào ngày cho trước.
   * @returns Chuỗi ngày sau khi cộng với định dạng YYYY-MM-DD.
   * @throws HttpException nếu chuỗi ngày không hợp lệ.
   */
  static addDays(date: string, days: number): string {
    const format: string = 'YYYY-MM-DD';

    if (!moment(date, format, true).isValid()) {
      throw new HttpException(
        new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, `Ngày không đúng định dạng YYYY-MM-DD, vui lòng kiểm tra lại!`),
        HttpStatus.OK,
      );
    }

    return moment(date, format).add(days, 'days').format(format);
  }

  static formatDateTimeVNToString(date: Date | string): string {
    return moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
  }
}
