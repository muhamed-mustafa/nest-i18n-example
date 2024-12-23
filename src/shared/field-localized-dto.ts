import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class FieldLocalizedDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  ar: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  en: string;
}
