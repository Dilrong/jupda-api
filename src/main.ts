import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { useContainer } from 'class-validator';

import { AppModule } from './modules/app/app.module';
import { Constants } from './common/Constants';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const env = process.env.APP_ENV || Constants.dev;
  const app = await NestFactory.create(AppModule, {
    logger:
      env === Constants.production || env === Constants.staging
        ? ['error', 'warn']
        : ['log', 'verbose', 'error', 'warn'],
  });
  if (process.env.APP_ENV || 'dev') {
    setupSwagger(app);
  }
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
