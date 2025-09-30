import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { randomUUID } from 'crypto';
import { PaymentStatus } from '../entities/payment-status.enum'
import { CancelPaymentDto } from '../dto/cancel-payment.dto';

@Injectable()
export class PaymentsRepository {
  constructor(private prisma: PrismaService) { }

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

  findByExternalId(externalId: string) {
    return this.prisma.payment.findUnique({ where: { externalId } });
  }


  async search(where: any, skip: number, take: number) {
    return this.prisma.payment.findMany({
      where,
      skip,
      take,
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

  async count(where: any) {
    return this.prisma.payment.count({ where });
  }
}
