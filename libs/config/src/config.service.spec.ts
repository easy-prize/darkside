import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ConfigService,
        useValue: new ConfigService(),
      }],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw error when config is wrong', () => {
    expect(() => {
      return new ConfigService({
        MONGODB_URI: '',
      });
    }).toThrow();
  });

  it('should use default value', () => {
    expect(new ConfigService({
      JWT_SECRET: undefined,
    })).toBeInstanceOf(ConfigService);
  });
});
