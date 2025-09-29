import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class SearchPaymentDto {
  @IsOptional()
  @IsDateString()
  startCreationDate?: string;

  @IsOptional()
  @IsDateString()
  endCreationDate?: string;

  @IsOptional()
  @IsDateString()
  startPaymentDate?: string;

  @IsOptional()
  @IsDateString()
  endPaymentDate?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  paginate?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;
}

