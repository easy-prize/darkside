import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateException extends HttpException {
  constructor(message?: string) {
    super(message || 'Conflict', HttpStatus.CONFLICT);
  }
}
