import { MongoModule, MongoService } from '@app/mongo';
import { PushModule, PushService } from '@app/push';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  imports: [MongoModule, PushModule],
  providers: [{
    inject: [MongoService, PushService],
    provide: UserService,
    async useFactory(database: MongoService, pushService: PushService) {
      const userService = new UserService(database, pushService);
      await userService.initialize();
      return userService;
    },
  }],
})
export class UserModule {
}
