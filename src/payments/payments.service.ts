import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './repositories/payments.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CancelPaymentDto } from './dto/cancel-payment.dto';
import { SearchPaymentDto } from './dto/search-payment.dto';
import { PaymentStatus } from './entities/payment-status.enum'

@Injectable()
export class PaymentsService {
  constructor(private paymentsRepo: PaymentsRepository) { }

  async createPayment(userId: number, dto: CreatePaymentDto) {
    if (dto.amount <= 0) throw new Error('Amount must be greater than zero');
    const exists = await this.paymentsRepo.findByExternalId(dto.externalId);
    if (exists) throw new Error('ExternalId already exists');
    const dueDate = new Date(dto.dueDate);
    if (isNaN(dueDate.getTime())) throw new Error('Invalid due date');
    if (dueDate < new Date()) throw new Error('Due date must be in the future');
    return this.paymentsRepo.create(dto, userId);
  }
  async getPayment(reference: string, paymentId: string) {
    const payment = await this.paymentsRepo.findByReferenceAndId(reference, Number(paymentId));
    if (!payment) throw new Error('Payment not found');
    return payment;
  }

  async searchPayments(dto: SearchPaymentDto) {
    const { page = 1, paginate = 10, ...filters } = dto;
    return this.paymentsRepo.search(filters, page, paginate);
  }

  async cancelPayment(dto: CancelPaymentDto) {
    const payment = await this.paymentsRepo.findByReference(dto.reference);

    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.status !== PaymentStatus.CREATED) {
      throw new Error('Payment cannot be cancelled unless status = 01 (Created)');
    }

    return this.paymentsRepo.cancel(dto);
  }

}
