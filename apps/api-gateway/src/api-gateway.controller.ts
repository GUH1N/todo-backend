import { Controller, Get, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('TASK_SERVICE') private readonly taskClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @Get('auth/ping')
  authPing() {
    return this.authClient.send({ cmd: 'auth_ping' }, {});
  }

  @Get('task/ping')
  taskPing() {
    return this.taskClient.send({ cmd: 'task_ping' }, {});
  }
}
