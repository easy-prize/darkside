import { PushService } from '@app/push';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationCodeService } from './authorization-code.service';

describe('AuthorizationCodeService', () => {
  let service: AuthorizationCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PushService],
      providers: [AuthorizationCodeService],
    }).compile();

    service = module.get<AuthorizationCodeService>(AuthorizationCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
