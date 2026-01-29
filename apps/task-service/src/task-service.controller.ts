import { Controller, Get } from '@nestjs/common';
import { TaskServiceService } from './task-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TaskServiceController {
  constructor(private readonly taskServiceService: TaskServiceService) {}

  @MessagePattern({ cmd: 'task_ping' })
  ping() {
    return { service: 'task', status: 'ok' };
  }

  @Get()
  getHello(): string {
    return this.taskServiceService.getHello();
  }
}
