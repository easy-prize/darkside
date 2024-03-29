import { ConfigModule, ConfigService } from '@app/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoService } from './mongo.service';

describe('MongoService', () => {
  let service: MongoService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [{
        inject: [ConfigService],
        provide: MongoService,
        useFactory(config: ConfigService): Promise<MongoService> {
          return new MongoService(config.mongodbURI).connect();
        },
      }],
    }).compile();

    service = module.get<MongoService>(MongoService);
  }, 100000);

  afterAll(async () => {
    await service.onApplicationShutdown();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
