import { ConfigModule } from '@app/config';
import { HttpModule, Module } from '@nestjs/common';
import { PushService } from './push.service';

@Module({
  exports: [PushService],
  imports: [HttpModule.register({
    baseURL: 'https://sens.apigw.ntruss.com/',
  }), ConfigModule],
  providers: [PushService],
})
export class PushModule {
}
