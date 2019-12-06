import { ConfigModule, ConfigService } from '@app/config';
import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';

@Module({
  exports: [MongoService],
  imports: [ConfigModule],
  providers: [{
    inject: [ConfigService],
    provide: MongoService,
    useFactory(config: ConfigService): Promise<MongoService> {
      return new MongoService(config.mongodbURI).connect();
    },
  }],
})
export class MongoModule {
}
