import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  externalId: string;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsDateString()
  dueDate: string;

  @IsString()
  callbackURL: string;

  @IsOptional()
  @IsString()
  status?: string;
}

