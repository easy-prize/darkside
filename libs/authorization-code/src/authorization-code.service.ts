import { PushService } from '@app/push';
import { Inject, Injectable } from '@nestjs/common';
import { uniformInt } from 'random';
import { AuthorizationCodeError } from './class/authorization-code-error.class';

@Injectable()
export class AuthorizationCodeService {
  @Inject()
  private readonly pushService: PushService;
  private readonly random: () => number = uniformInt(1, 999999);
  private readonly codes: Map<string, string> = new Map();

  public async send(phone: string): Promise<string> {
    const code = this.random().toFixed(6);
    await this.pushService.sendMessage([phone], `${code} is your authorization code`);
    return code;
  }

  public verify(phone: string, code: string | number): void {
    if (this.codes.get(phone) !== (typeof code === 'string' ? code : code.toFixed(6))) {
      throw new AuthorizationCodeError();
    }
  }
}
