import { HttpException as NestHttpException, HttpStatus } from '@nestjs/common';

import { ErrorStatus } from '../enums/ErrorStatus.enum';

export class HttpException extends NestHttpException {
  public errorStatus = '';

  constructor(
    name: string | Record<string, any>,
    status: HttpStatus,
    errorStatus: ErrorStatus,
  ) {
    super(name, status);

    this.errorStatus = errorStatus;
  }
}
