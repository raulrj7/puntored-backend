import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) return user;
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id, role: user.role };
    return { accessToken: this.jwtService.sign(payload, { expiresIn: '24h' }) };
  }
}
