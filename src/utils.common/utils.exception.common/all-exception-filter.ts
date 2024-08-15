import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponseData } from '../utils.response.common/utils.base.response.common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus;
    let message: string;
    let data: unknown;
    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      message = (exception.getResponse()?.['message'] || []).toString() || 'Error!';
    } else if (exception instanceof HttpException) {
      status = exception.getResponse()?.['status'] || exception.getStatus();
      message = exception.message || 'Error!';
      data = exception.getResponse()?.['data'];
    } else {
      console.error(exception);

      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = (exception as Error)?.message || 'Internal Server Error!';
    }

    const res = new BaseResponseData(status, message, data);
    const contextType = host.getType();
    if (contextType == 'http') {
      return response.status(HttpStatus.OK).json(new BaseResponseData(res.getStatus(), res.getMessage(), res.getData()));
    } else if (contextType == 'rpc') {
      return new BaseResponseData(res.getStatus(), res.getMessage(), res.getData());
    }
  }
}
