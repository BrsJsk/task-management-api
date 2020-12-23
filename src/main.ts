import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const port = process.env.port || 3333;
  await app.listen(port);

  logger.log(`Application started on port: ${port}`);
}

bootstrap();
