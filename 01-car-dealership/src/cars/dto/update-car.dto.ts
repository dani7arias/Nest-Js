import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString({ message: `The brand most be a cool string` })
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()
  readonly model?: string;
}
