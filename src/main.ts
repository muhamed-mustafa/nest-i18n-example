import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(new I18nValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));

  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: false }));

  await app.listen(port);
}

bootstrap();
