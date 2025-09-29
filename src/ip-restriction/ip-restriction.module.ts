import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { IpRestrictionService } from './ip-restriction.service';
import { IpRestrictionController } from './ip-restriction.controller';
import { PrismaService } from '../prisma/prisma.service';
import { IpRestrictionMiddleware } from './ip-restriction.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule ],
  controllers: [IpRestrictionController],
  providers: [IpRestrictionService, PrismaService],
  exports: [IpRestrictionService],
})
export class IpRestrictionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IpRestrictionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
