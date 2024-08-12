import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ResponseData } from '../utils.response.common/utils.response.common';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): ResponseData {
    console.log('🚀 ~ GrpcExceptionFilter ~ exception:', exception);
    let response = new ResponseData();
    const data = host.switchToHttp().getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const key: string = typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse['message'][0];

      message = key;
    } else if (exception instanceof Error) {
      message = exception.message || message;
      // data.status(statusCode).json(response);
    }

    response.setStatus(statusCode);
    response.setMessage(statusCode, message);
    return response;
  }
}
