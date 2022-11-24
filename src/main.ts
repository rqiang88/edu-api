import { ResponseInterceptor } from '@/core/interceptors/response.interceptor';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Edu Admin')
    .setDescription('The edu API')
    .setVersion('1.0')
    .addTag('Edu')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  process.on('uncaughtException', (err: any) => {
    console.log(err);
  });
  await app.listen(3000);
}
bootstrap();
