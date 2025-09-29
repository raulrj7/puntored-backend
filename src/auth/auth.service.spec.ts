import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('fake-jwt-token'),
  };

  beforeEach(async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser returns user if password matches', async () => {
    const user = { id: 1, username: 'test', password: 'hashed' };
    mockPrismaService.user.findUnique.mockResolvedValueOnce(user);

    const result = await service.validateUser('test', 'password');
    expect(result).toEqual(user);
  });

  it('login returns access token', async () => {
    const user = { id: 1, username: 'test', role: 'user' };
    const result = await service.login(user);
    expect(result).toEqual({ accessToken: 'fake-jwt-token' });
  });
});
