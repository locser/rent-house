import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';

export class BaseResponseData {
  @ApiProperty({
    type: Number,
    description: 'HTTP status code',
    example: 200,
  })
  private status: HttpStatus;
  @ApiProperty({
    type: String,
    description: 'OK',
    example: 200,
  })
  private message: string;
  @ApiProperty({
    type: Object,
    description: 'Data',
    example: null,
  })
  private data: Object;

  constructor(status: number = null, message: string = null, data?: Object) {
    this.status = status ? +status : +HttpStatus.OK;
    this.message = message ? message : 'SUCCESS';
    this.data = data ? data : null;
  }

  public getStatus(): HttpStatus {
    return this.status;
  }

  public setStatus(status: HttpStatus): void {
    this.status = status;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(status: HttpStatus, message: string): void {
    if (message) {
      this.message = message;
      this.status = status;
    } else {
      switch (status) {
        case HttpStatus.OK:
          this.message = 'SUCCESS';
          break;
        case HttpStatus.BAD_REQUEST:
          this.message = 'Dữ liệu không hợp lệ';
          break;
        default:
          this.message = 'SUCCESS';
          break;
      }
    }
  }

  public getData(): Object {
    return this.data;
  }

  public setData(data: Object): void {
    this.data = data;
  }
}

export class BaseOkResponse {
  private status: HttpStatus;
  private message: string;
  private data: Object;

  constructor(data?: Object) {
    this.status = HttpStatus.OK;
    this.message = 'OK';
    this.data = data ? data : null;
  }
}

export function returnBaseResponse(res: Response, data?: any) {
  return res.status(HttpStatus.OK).send(new BaseOkResponse(data));
}
