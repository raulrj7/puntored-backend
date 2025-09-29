import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn().mockReturnValue({ accessToken: 'fake-jwt-token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login returns token for valid user', async () => {
    const dto: LoginDto = { username: 'test', password: 'pass' };
    mockAuthService.validateUser.mockResolvedValueOnce({ id: 1, username: 'test', role: 'user' });

    const result = await controller.login(dto);
    expect(result).toEqual({ accessToken: 'fake-jwt-token' });
  });

  it('login throws error for invalid user', async () => {
    const dto: LoginDto = { username: 'wrong', password: 'pass' };
    mockAuthService.validateUser.mockResolvedValueOnce(null);

    await expect(controller.login(dto)).rejects.toThrow('Invalid credentials');
  });
});
