import { Test, TestingModule } from '@nestjs/testing';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
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

  it('should use .env file when it is exists', () => {
    const envFile = resolve(process.cwd(), '.env');
    if (!fileExistsSync(envFile)) {
      writeFileSync(envFile, '');
    }
  });

  it('should use default value', () => {
    expect(new ConfigService({
      JWT_SECRET: undefined,
    })).toBeInstanceOf(ConfigService);
    expect(new ConfigService({
      JWT_SECRET: 'SLoWMoTIoN',
    })).toBeInstanceOf(ConfigService);
  });
});
