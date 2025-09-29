import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class IpRestrictionService {
  private prisma = new PrismaClient();

  async getBlockedIps() {
    return this.prisma.ipRestriction.findMany({
      where: { enabled: true },
      select: { ip: true },
    });
  }

  async addBlockedIp(ip: string) {
    return this.prisma.ipRestriction.create({ data: { ip } });
  }

  async removeBlockedIp(ip: string) {
    return this.prisma.ipRestriction.delete({ where: { ip } });
  }

  async toggle(enabled: boolean) {
    return this.prisma.ipRestriction.updateMany({ data: { enabled } });
  }

  async isBlocked(ip: string) {
    const blocked = await this.prisma.ipRestriction.findFirst({
      where: { ip, enabled: true },
    });
    return !!blocked;
  }
}
