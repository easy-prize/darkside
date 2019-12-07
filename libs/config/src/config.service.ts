import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
import { Config, EnvironmentVariablesClass, NcpConfig, NcpSmsConfig, NodeEnv } from '.';

@Injectable()
export class ConfigService implements Config {
  public readonly nodeEnv: NodeEnv;
  public readonly mongodbURI: string;
  public readonly jwtSecret: Buffer;

  public readonly host?: string;
  public readonly port: number;

  public readonly ncp: NcpConfig;
  public readonly ncpSms: NcpSmsConfig;

  constructor(customConfig?: Record<string, string>) {
    const envFile = resolve(process.cwd(), '.env');
    const env = new EnvironmentVariablesClass({
      ...process.env,
      ...fileExistsSync(envFile) && parse(readFileSync(envFile)),
      ...customConfig,
    });

    this.nodeEnv = env.NODE_ENV;
    this.mongodbURI = env.MONGODB_URI;
    this.jwtSecret = env.JWT_SECRET ? Buffer.from(env.JWT_SECRET) : randomBytes(32);

    this.port = parseInt(env.PORT, 10);
    this.host = env.HOST;

    this.ncp = {
      accessKey: env.NCP_ACCESS_KEY,
      secretKey: env.NCP_SECRET_KEY,
    };
    this.ncpSms = {
      sender: env.NCP_SMS_SENDER,
      serviceId: env.NCP_SMS_SERVICE_ID,
    };
  }
}

export const config = new ConfigService();
