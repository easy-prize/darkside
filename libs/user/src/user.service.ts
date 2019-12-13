import { MongoService } from '@app/mongo';
import { PushService } from '@app/push';
import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { Collection, FilterQuery } from 'mongodb';
import { User } from './class/user.class';
import { DuplicateException } from './exception/duplicate.exception';

@Injectable()
export class UserService {
  private readonly users: Collection<User>;

  constructor(database: MongoService, private readonly pushService: PushService) {
    this.users = database.db().collection('users');
  }

  public async initialize() {
    await this.users.createIndex({
      mail: 1,
    }, {
      dropDups: true,
      unique: true,
    });
  }

  public async addUser(user: User) {
    await validateOrReject(user);
    if (await this.users.find({
      mail: {
        $eq: user.mail,
      },
    }).count() > 0) {
      throw new DuplicateException('Mail Address is Already Exists');
    }
    await this.users.insertOne(user);
  }

  public async sendMessageToUser(filter: FilterQuery<User>, message: string) {
    const users = await this.users.find(filter).map((i) => new User(i)).toArray();
    await this.pushService.sendMessage(users.map<string>((i) => i.phone), message);
  }
}
