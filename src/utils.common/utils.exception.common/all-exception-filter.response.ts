// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
// import { ResponseData } from '../utils.response.common/utils.response.common';
// import { Response } from 'express';

// @Catch(HttpException)
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost): ResponseData {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const statusCode = exception.getStatus();
//     const exceptionResponse = exception.getResponse();

//     const responseData = new ResponseData();
//     responseData.setStatus(HttpStatus.BAD_REQUEST);

//     if (typeof exceptionResponse === 'string') {
//       responseData.setMessage(statusCode || HttpStatus.BAD_REQUEST, exceptionResponse);
//     } else if (exceptionResponse[0]) {
//       //đoạn này
//       /**
//       *         "children": [
//            {
//                "target": [
//                    {
//                        "freight_types": [
//                            0
//                        ],
//                        "vi_name": "i hate u",
//                        "eng_name": "toi yeu em",
//                        "code": "iloveu"
//                    }
//                ],
//                "value": {
//                    "freight_types": [
//                        0
//                    ],
//                    "vi_name": "i hate u",
//                    "eng_name": "toi yeu em",
//                    "code": "iloveu"
//                },
//                "property": "0",
//                "children": [
//                    {
//                        "target": {
//                            "freight_types": [
//                                0
//                            ],
//                            "vi_name": "i hate u",
//                            "eng_name": "toi yeu em",
//                            "code": "iloveu"
//                        },
//                        "value": [
//                            0
//                        ],
//                        "property": "freight_types",
//                        "children": [],
//                        "constraints": {
//                            "min": "Các phần tử trong freight_types phải lớn hơn 0"
//                        }
//                    }
//                ]
//            }
//        ]
//       */
//       const tempException = exceptionResponse[0];
//       if (tempException?.constraints) {
//         const key: string = Object.keys(tempException?.constraints)[0];
//         responseData.setMessage(statusCode || HttpStatus.BAD_REQUEST, tempException.constraints[key]);

//         return responseData;
//       }

//       if (tempException['children']?.length > 0) {
//         /**
//         * "children": [
//                    {
//                        "target": {
//                            "freight_types": [
//                                0
//                            ],
//                            "vi_name": "",
//                            "eng_name": "",
//                            "code": ""
//                        },
//                        "value": [
//                            0
//                        ],
//                        "property": "freight_types",
//                        "children": [],
//                        "constraints": {
//                            "min": "Các phần tử trong freight_types phải lớn hơn 0"
//                        }
//                    }
//                ]
//         */
//         let children = tempException['children'][0]?.children[0];

//         if (children?.constraints) {
//           const key: string = Object.keys(children?.constraints)[0];
//           responseData.setMessage(statusCode || HttpStatus.BAD_REQUEST, children?.constraints[key] || 'ERROR');
//         }
//       }
//     } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
//       const message = (exceptionResponse as any).message;

//       console.log(message);

//       if (Array.isArray(message) && message[0] && message[0].constraints) {
//         const key: string = Object.keys(message[0].constraints)[0];
//         responseData.setMessage(statusCode || HttpStatus.BAD_REQUEST, message[0].constraints[key]);
//       } else if (Array.isArray(message) && message[0] && typeof message[0] == 'string') {
//         responseData.setMessage(statusCode || HttpStatus.BAD_REQUEST, message[0]);
//       } else if (typeof message === 'string') {
//         responseData.setMessage(statusCode || HttpStatus.BAD_REQUEST, message);
//       } else {
//         responseData.setMessage(statusCode || HttpStatus.BAD_REQUEST, 'Có lỗi từ Server!');
//       }
//     } else {
//       responseData.setMessage(HttpStatus.BAD_REQUEST, 'Có lỗi từ Server!');
//     }

//     response.status(HttpStatus.OK).send(responseData);
//   }
// }
