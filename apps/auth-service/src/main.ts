import { NestFactory } from '@nestjs/core';
import { Request, Response } from 'express';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // 1️⃣ Create normal Nest app (HTTP-capable)
  const app = await NestFactory.create(AuthServiceModule);

  // 2️⃣ Attach TCP microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4001,
    },
  });

  // 3️⃣ Minimal HTTP endpoint (Render needs this)
  app.getHttpAdapter().get('/health', (req: Request, res: Response) => {
    res.send('OK');
  });

  // 4️⃣ Start everything
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000);

  console.log('🔐 Auth service running on TCP :4001');
  console.log('🌐 Health check running on HTTP');
}

bootstrap();
