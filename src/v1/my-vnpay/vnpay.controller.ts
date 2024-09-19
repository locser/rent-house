import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment-timezone';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { Auth, GetUserFromToken, TYPE_PLATFORM } from '../auth/auth.guard';
import { Public } from '../auth/roles.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { MyVnpayService } from './vnpay.service';

@Controller('')
export class MyVnpayController {
  constructor(private readonly vnpayService: MyVnpayService) {}

  @Get('vnpay_return')
  async handleIpn(@Query() query: any, @Res() res: Response) {
    return res.json({});
  }

  // call http://localhost:3000/api/v1/vnpay/payment?user_id=${user.id}&order_id=${body.orderId}&amount=${body.amount}

  @Public()
  @Get('/vnpay/payment')
  async callPayment(@GetUserFromToken() user: UserEntity, @Req() req: Request, @Query() body: any, @Res() res: Response) {
    const { order_id, amount, user_id } = body;

    console.log(' nạp tiền cho user_id', user_id, ' thành công ', amount);

    return res.status(200).json(new BaseResponseData(200, 'success', {}));
  }

  @Auth(TYPE_PLATFORM.ADMIN, TYPE_PLATFORM.SELLER, TYPE_PLATFORM.CUSTOMER)
  @Get('/vnpay/create-url-payment')
  async createPayment(@GetUserFromToken() user: UserEntity, @Req() req: Request, @Query() body: any, @Res() res: Response) {
    // const { orderId, amount, returnUrl } = body;
    const date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let tmnCode = '0C5GM1QL';
    let secretKey = 'P643CAZ3GQLZQ4D2H5Y21F65N4DPN7QN';
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    let returnUrl = `http://localhost:3000/api/v1/vnpay/payment?user_id=${user.id}&order_id=${body.orderId}&amount=${body.amount}`;
    // let returnUrl = `{user_id: ${user.id}, order_id: ${body.orderId}, amount: ${body.amount}}`;
    let orderId = moment(date).format('DDHHmmss');
    let amount = body?.amount;
    let bankCode = body?.bankCode;

    let locale = req.body.language;
    if (locale === null || locale === '') {
      locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = '127.0.0.1';
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = this.sortObject(vnp_Params);
    // console.log('locser -> file: order.js:81 -> vnp_Params:', vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require('crypto');
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return res.status(200).json(
      new BaseResponseData(200, 'success', {
        url: vnpUrl,
      }),
    );
  }

  @Auth(TYPE_PLATFORM.ADMIN, TYPE_PLATFORM.SELLER, TYPE_PLATFORM.CUSTOMER)
  @Get('my-wallet')
  async getMyWallet(@GetUserFromToken() user: UserEntity, @Req() req: Request, @Query() body: any, @Res() res: Response) {
    const data = await this.vnpayService.getAllWallets(+user.id);
    return res.status(200).json(new BaseResponseData(200, 'success', data));
  }

  @Auth(TYPE_PLATFORM.ADMIN, TYPE_PLATFORM.SELLER, TYPE_PLATFORM.CUSTOMER)
  @Get('history-payment')
  async getHistoryPayment(@GetUserFromToken() user: UserEntity, @Req() req: Request, @Query() body: any, @Res() res: Response) {
    const data = await this.vnpayService.getTransactionHistory(+user.id);
    return res.status(200).json(new BaseResponseData(200, 'success', data));
  }

  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
}
/**
 * locser -> file: order.js:81 -> vnp_Params: {
  vnp_Amount: '1000000',
  vnp_Command: 'pay',
  vnp_CreateDate: '20240919204138',
  vnp_CurrCode: 'VND',
  vnp_IpAddr: '127.0.0.1',
  vnp_Locale: 'vn',
  vnp_OrderInfo: 'Thanh+toan+cho+ma+GD%3A19204138',
  vnp_OrderType: 'other',
  vnp_ReturnUrl: 'http%3A%2F%2Flocalhost%3A8888%2Forder%2Fvnpay_return',
  vnp_TmnCode: '0C5GM1QL',
  vnp_TxnRef: '19204138',
  vnp_Version: '2.1.0'
}
 */
