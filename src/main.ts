import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Enable CORS
    const CORS_DOMAINS = process.env.CORS_DOMAINS
    app.enableCors({
      origin: CORS_DOMAINS, 
    });
    
  await app.listen(3002);
}
bootstrap();
