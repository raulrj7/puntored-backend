import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { randomUUID } from 'crypto';
import { PaymentStatus } from '../entities/payment-status.enum'
import { CancelPaymentDto } from '../dto/cancel-payment.dto';

@Injectable()
export class PaymentsRepository {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePaymentDto, userId: number) {
    return this.prisma.payment.create({
      data: {
        reference: randomUUID(),
        externalId: dto.externalId,
        amount: dto.amount,
        description: dto.description,
        dueDate: new Date(dto.dueDate),
        callbackURL: dto.callbackURL,
        user: { connect: { id: userId } },
        status: PaymentStatus.CREATED
      },
    });
  }

  findByReference(reference: string) {
    return this.prisma.payment.findUnique({ where: { reference } });
  }

  search(filters: any, page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const where: any = {};

    if (filters.status) where.status = filters.status;
    if (filters.from || filters.to) where.dueDate = {};
    if (filters.from) where.dueDate.gte = new Date(filters.from);
    if (filters.to) where.dueDate.lte = new Date(filters.to);

    return this.prisma.payment.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });
  }


  cancel(dto: CancelPaymentDto) {
    return this.prisma.payment.update({
      where: { reference: dto.reference },
      data: {
        status: PaymentStatus.CANCELLED,
        updateDescription: dto.updateDescription,
      },
    });
  }

  

  findByReferenceAndId(reference: string, id: number) {
    return this.prisma.payment.findFirst({
      where: { reference, id },
    });
  }
}
