import { Injectable } from '@nestjs/common';
import { CreateVnpayDto } from './dto/create-vnpay.dto';
import { UpdateVnpayDto } from './dto/update-vnpay.dto';

import { VNPay, ignoreLogger } from 'vnpay';
import { VnpayService } from 'nestjs-vnpay';

// const vnpay = new VNPay({
//   tmnCode: 'YOUR_TMNCODE',
//   secureSecret: 'YOUR_SECURE_SECRET',
//   vnpayHost: 'https://sandbox.vnpayment.vn',
//   testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
//   hashAlgorithm: 'SHA512', // tùy chọn

//   /**
//    * Sử dụng enableLog để bật/tắt logger
//    * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
//    */
//   enableLog: true, // optional

//   /**
//    * Hàm `loggerFn` sẽ được gọi để ghi log
//    * Mặc định, loggerFn sẽ ghi log ra console
//    * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
//    *
//    * `ignoreLogger` là một hàm không làm gì cả
//    */
//   loggerFn: ignoreLogger, // optional
// });

@Injectable()
export class MyVnpayService {
  constructor(private readonly vnpayService: VnpayService) {}

  async getBankList() {
    return this.vnpayService.getBankList();
  }
}
