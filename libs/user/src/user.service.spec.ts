import { MongoService } from '@app/mongo';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './class/user.class';
import { Gender } from './enum/gender.enum';
import { DuplicateException } from './exception/duplicate.exception';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let database: MongoService;
  const user: User = {
    birth: new Date(),
    gender: Gender.male,
    mail: 'admin@slowmotion.dev',
    name: 'Joosung Park',
    password: Buffer.from('P@ssw0rd'),
    phone: '01000000000',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
    database = module.get<MongoService>(MongoService);
  });

  afterAll(async () => {
    await database.db().collection('users').drop();
    await database.close();
  });

  it('should reinitialize own instance', async () => {
    await service.initialize();
  });

  it('should add user', async () => {
    await service.addUser(user);
    await expect(service.addUser(user)).rejects.toBeInstanceOf(DuplicateException);
  });

  it('should send message to users', async () => {
    await service.sendMessageToUser({}, 'Test');
  });
});
