import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { MyVnpayService } from './vnpay.service';

import {
  IpnFailChecksum,
  IpnOrderNotFound,
  IpnInvalidAmount,
  InpOrderAlreadyConfirmed,
  IpnUnknownError,
  IpnSuccess,
  VerifyReturnUrl,
  consoleLogger,
  CURR_CODE_VND,
  VnpCurrCode,
} from 'vnpay';

import { ProductCode, VnpLocale, dateFormat } from 'vnpay';
import { VnpayService } from 'nestjs-vnpay';
import { Request, Response } from 'express';

/* ... */

@Controller('vnpay')
export class MyVnpayController {
  constructor(
    private readonly vnpayService: MyVnpayService,
    private vnpay: VnpayService,
  ) {}

  @Get('vnpay_return')
  async handleIpn(@Query() query: any, @Res() res: Response) {
    try {
      return res.json(IpnSuccess);

      const verify: VerifyReturnUrl = await this.vnpay.verifyIpnCall(query);
      if (!verify.isVerified) {
        return res.json(IpnFailChecksum);
      }
      // // Sau đó cập nhật trạng thái về cho VNPay biết rằng bạn đã xác nhận đơn hàng
      return res.json(IpnSuccess);
    } catch (error) {
      /**
       * Xử lí lỗi ngoại lệ
       * Ví dụ như không đủ dữ liệu, dữ liệu không hợp lệ, cập nhật database thất bại
       */
      console.log(`verify error: ${error}`);
      return res.json(IpnUnknownError);
    }
  }

  @Get('create-payment')
  async createPayment(@Req() req: Request, @Body() body: any, @Res() res: Response) {
    const { orderId, amount, returnUrl } = body;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getMinutes() + 5);

    const paymentUrl = this.vnpay.buildPaymentUrl(
      {
        vnp_Amount: 10000000, // Đơn vị VND. Số tiền đã được tự động tính toán, không cần nhân 100 lần theo VNPay
        vnp_CurrCode: VnpCurrCode.VND, // Đơn vị tiền tệ
        vnp_IpAddr: '133.322.11.23',
        vnp_TxnRef: '123', // Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày
        vnp_OrderInfo: 'Thanh toan don hang locser', //	Quy định dữ liệu gửi sang VNPAY (Tiếng Việt không dấu và không bao gồm các ký tự đặc biệt). Ví dụ: Nap tien cho thue bao 0123456789. So tien 100,000 VND
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: 'http://localhost:3000/api/v1/vnpay/vnpay_return',
        vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
        vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là hiện tại
        vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
        // vnp_BankCode: 'VNPAY',
      },
      {
        logger: {
          type: 'pick', // Chế độ chọn trường log, có thể là 'pick', 'omit' hoặc 'all'
          fields: ['createdAt', 'method', 'paymentUrl'], // Chọn các trường cần log
          loggerFn: consoleLogger, // Log dữ liệu ra console, có thể thay bằng hàm khác
        },
      },
    );
    return res.json(paymentUrl);
  }
}

// app.get('/vnpay-ipn', async (req, res) => {
//   try {
//       const verify: VerifyReturnUrl = vnpay.verifyIpnCall(req.query);
//       if (!verify.isVerified) {
//           return res.json(IpnFailChecksum);
//       }

//       // Tìm đơn hàng trong database của bạn
//       const foundOrder = await findOrderById(verify.vnp_TxnRef); // Hàm tìm đơn hàng theo id, bạn cần tự cài đặt

//       // Nếu không tìm thấy đơn hàng hoặc mã đơn hàng không khớp
//       if (!foundOrder || verify.vnp_TxnRef !== foundOrder.orderId) {
//           return res.json(IpnOrderNotFound);
//       }

//       // Nếu số tiền thanh toán không khớp
//       if (verify.vnp_Amount !== foundOrder.amount) {
//           return res.json(IpnInvalidAmount);
//       }

//       // Nếu đơn hàng đã được xác nhận trước đó
//       if (foundOrder.status === 'completed') {
//           return res.json(InpOrderAlreadyConfirmed);
//       }

//       /**
//        * Sau khi xác thực đơn hàng hoàn tất,
//        * bạn có thể cập nhật trạng thái đơn hàng trong database của bạn
//        */
//       foundOrder.status = 'completed';
//       await updateOrder(foundOrder); // Hàm cập nhật trạng thái đơn hàng, bạn cần tự cài đặt

//       // Sau đó cập nhật trạng thái về cho VNPay biết rằng bạn đã xác nhận đơn hàng
//       return res.json(IpnSuccess);
//   } catch (error) {
//       /**
//        * Xử lí lỗi ngoại lệ
//        * Ví dụ như không đủ dữ liệu, dữ liệu không hợp lệ, cập nhật database thất bại
//        */
//       console.log(`verify error: ${error}`);
//       return res.json(IpnUnknownError);
//   }
// })
