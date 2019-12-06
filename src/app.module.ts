import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [MongoModule],
  providers: [AppService],
})
export class AppModule {
}
