import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('v1')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('authenticate')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }
}
