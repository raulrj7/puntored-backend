import { Controller, Get, Post, Delete, Patch, Body, UseGuards } from '@nestjs/common';
import { IpRestrictionService } from './ip-restriction.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/ip-restriction')
export class IpRestrictionController {
  constructor(private ipService: IpRestrictionService) {}

  @Get()
  @Roles('ADMIN')
  async getBlockedIps() {
    return await this.ipService.getBlockedIps();
  }

  @Post('block')
  @Roles('ADMIN')
  async blockIp(@Body('ip') ip: string) {
    await this.ipService.addBlockedIp(ip);
    return { message: `${ip} blocked` };
  }

  @Delete('unblock')
  @Roles('ADMIN')
  async unblockIp(@Body('ip') ip: string) {
    await this.ipService.removeBlockedIp(ip);
    return { message: `${ip} unblocked` };
  }

  @Patch('toggle')
  @Roles('ADMIN')
  async toggleRestriction(@Body('enabled') enabled: boolean) {
    await this.ipService.toggle(enabled);
    return { message: `IP restriction ${enabled ? 'enabled' : 'disabled'}` };
  }
}
