import { Controller, Get, Post } from '@nestjs/common';
import { PayService } from './pay.service';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Get()
  getPay(): string {
    return this.payService.getPay();
  }

  @Post()
  postPay(): string {
    return this.payService.postPay();
  }
}
