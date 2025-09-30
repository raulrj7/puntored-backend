import { Controller, Post, Body, Get, Param, Query, Put, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CancelPaymentDto } from './dto/cancel-payment.dto';
import { SearchPaymentDto } from './dto/search-payment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('v1/payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(req.user.id, dto);
  }

  @Get(':reference/:paymentId')
  get(
    @Param('reference') reference: string,
    @Param('paymentId') paymentId: string,
    ) {
   return this.paymentsService.getPayment(reference, paymentId);
  }
  @Get('search')
  search(@Query() dto: SearchPaymentDto) {
    return this.paymentsService.searchPayments(dto);
  }

  @Put('cancel')
  cancel(@Body() dto: CancelPaymentDto) {
    return this.paymentsService.cancelPayment(dto);
  }
}

