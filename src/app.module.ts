import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { IpRestrictionModule } from './ip-restriction/ip-restriction.module';
import { IpRestrictionMiddleware } from './ip-restriction/ip-restriction.middleware';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(),
    AuthModule,
    PaymentsModule,
    IpRestrictionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IpRestrictionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
