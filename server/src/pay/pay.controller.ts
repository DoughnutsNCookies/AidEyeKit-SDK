import { Body, Controller, Get, Post } from '@nestjs/common';
import { PayService } from './pay.service';
import { GetPayDTO } from 'src/dto/pay.dto';

@Controller('pay')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Get()
  getPay(): GetPayDTO {
    return this.payService.getPay();
  }

  @Post()
  postPay(@Body() body: any): any {
    return this.payService.postPay(body);
  }
}
