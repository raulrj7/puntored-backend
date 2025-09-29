import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsRepository } from './repositories/payments.repository';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ AuthModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository, PrismaService],
})
export class PaymentsModule {}
