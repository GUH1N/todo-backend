import { NestFactory } from '@nestjs/core';
import { TaskServiceModule } from './task-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TaskServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 4002,
      },
    },
  );

  await app.listen();
  console.log('📋 Task service running on TCP :4002');
}
bootstrap();
