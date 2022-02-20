import 'dotenv/config';
import { ResponseInterceptor } from '@/injectables/interceptors/response.interceptor';
import { AllExceptionFilter } from '@/filters/all.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import { LogInterceptor } from '@/injectables/interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LogInterceptor());
  await app.listen(3000);
}
bootstrap();
