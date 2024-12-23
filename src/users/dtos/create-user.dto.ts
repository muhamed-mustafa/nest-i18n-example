import { Type } from 'class-transformer';
import { IsDefined, IsEmail, IsString, Length, ValidateNested } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { FieldLocalizedDto } from '../../shared/field-localized-dto';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  readonly username: string;

  @IsEmail({}, { message: i18nValidationMessage('users.EMAIL_NOT_CORRECT') })
  readonly email: string;

  @IsDefined()
  @Type(() => FieldLocalizedDto)
  @ValidateNested()
  readonly country: FieldLocalizedDto;

  @IsString()
  readonly password: string;
}
