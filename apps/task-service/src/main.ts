import { NestFactory } from '@nestjs/core';
import { Request, Response } from 'express';
import { TaskServiceModule } from './task-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // 1️⃣ Create normal Nest app (HTTP-capable)
  const app = await NestFactory.create(TaskServiceModule);

  // 2️⃣ Attach TCP microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4002,
    },
  });

  // 3️⃣ Minimal HTTP endpoint (Render health check)
  app.getHttpAdapter().get('/health', (req: Request, res: Response) => {
    res.send('OK');
  });

  // 4️⃣ Start both microservice and HTTP
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000); // HTTP port for Render

  console.log('📋 Task service running on TCP :4002');
  console.log('🌐 Health check running on HTTP');
}

bootstrap();
