import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Inject()
  private readonly appService: AppService;

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
