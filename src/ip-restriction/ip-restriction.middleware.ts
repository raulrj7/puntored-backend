import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as requestIp from 'request-ip';
import { IpRestrictionService } from './ip-restriction.service';

@Injectable()
export class IpRestrictionMiddleware implements NestMiddleware {
  constructor(private readonly ipService: IpRestrictionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const clientIp = requestIp.getClientIp(req);
    const isBlocked = await this.ipService.isBlocked(clientIp);
    if (isBlocked) {
      throw new ForbiddenException(`${clientIp} blocked`);
    }

    next();
  }
}
