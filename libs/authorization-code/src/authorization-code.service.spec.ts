import { PushModule } from '@app/push';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationCodeService } from './authorization-code.service';
import { AuthorizationCodeError } from './class/authorization-code-error.class';

describe('AuthorizationCodeService', () => {
  let service: AuthorizationCodeService;
  const phone = '01000000000';
  let code: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PushModule],
      providers: [AuthorizationCodeService],
    }).compile();

    service = module.get<AuthorizationCodeService>(AuthorizationCodeService);
  });

  it('should send message', async () => {
    code = await service.send(phone);
  });

  it('should verify given code', async () => {
    service.verify(phone, code);
    await expect(new Promise((resolve) => {
      service.verify(phone, 0);
      resolve();
    })).rejects.toBeInstanceOf(AuthorizationCodeError);
  });
});
