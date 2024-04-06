import { Injectable } from '@nestjs/common';

@Injectable()
export class PayService {
  constructor() {}

  getPay(): string {
    return 'Pay Service';
  }

  postPay(): string {
    return 'Post Pay Service';
  }
}
