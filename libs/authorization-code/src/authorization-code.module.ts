import { PushModule } from '@app/push';
import { Module } from '@nestjs/common';
import { AuthorizationCodeService } from './authorization-code.service';

@Module({
  providers: [AuthorizationCodeService],
  imports: [PushModule],
  exports: [AuthorizationCodeService],
})
export class AuthorizationCodeModule {
}
