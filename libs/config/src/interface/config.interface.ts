import { NcpConfig, NcpSmsConfig, NodeEnv } from '..';

export interface Config {
  nodeEnv: NodeEnv;
  mongodbURI: string;
  jwtSecret: Buffer;

  port: number;
  host?: string;

  ncp: NcpConfig;
  ncpSms: NcpSmsConfig;
}
