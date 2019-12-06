import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoService extends MongoClient implements OnApplicationShutdown {
  constructor(url: string) {
    super(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async connect(): Promise<MongoService> {
    await super.connect();
    return this;
  }

  public async onApplicationShutdown(): Promise<void> {
    await this.close();
  }
}
