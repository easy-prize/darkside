import { MongoModule } from '@app/mongo';
import { PushModule } from '@app/push';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [MongoModule, PushModule],
  providers: [AppService],
})
export class AppModule {
}
