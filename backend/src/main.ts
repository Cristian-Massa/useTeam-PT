import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from '@app/shared/filters/mongo-db.filter';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://0.0.0.0:3001',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    },
  });
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalFilters(new MongoExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
