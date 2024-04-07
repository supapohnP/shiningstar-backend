import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as moment from 'moment-timezone';

moment.tz.setDefault('Asia/Bangkok');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
