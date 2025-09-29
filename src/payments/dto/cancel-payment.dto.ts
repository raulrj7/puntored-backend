import { IsString, Length, IsIn } from 'class-validator';

export class CancelPaymentDto {
  @IsString()
  @Length(1, 60)
  reference: string;

  @IsIn(['03'])
  status: string;

  @IsString()
  @Length(1, 255)
  updateDescription: string;
}
