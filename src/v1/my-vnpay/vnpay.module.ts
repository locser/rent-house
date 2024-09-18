import { Module } from '@nestjs/common';
import { MyVnpayService } from './vnpay.service';
import { MyVnpayController } from './vnpay.controller';
import { HashAlgorithm, ignoreLogger } from 'vnpay';
import { VnpayModule, VnpayService } from 'nestjs-vnpay';

@Module({
  controllers: [MyVnpayController],
  providers: [MyVnpayService],

  imports: [
    VnpayModule.register({
      tmnCode: '',
      secureSecret: '',
      vnpayHost: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
      hashAlgorithm: HashAlgorithm.SHA256, // tùy chọn

      /**
       * Sử dụng enableLog để bật/tắt logger
       * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
       */
      enableLog: true, // tùy chọn

      /**
       * Hàm `loggerFn` sẽ được gọi để ghi log
       * Mặc định, loggerFn sẽ ghi log ra console
       * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
       *
       * `ignoreLogger` là một hàm không làm gì cả
       */
      loggerFn: ignoreLogger, // tùy chọn
    }),
  ],
})
export class MyVnpayModule {}
