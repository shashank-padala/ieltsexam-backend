import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('IELTS Exam Practice API')
    .setDescription('API documentation for the IELTS exam practice platform')
    .setVersion('1.0')
    .addTag('Exams') // ✅ Add exams tag
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
