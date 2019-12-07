import { IsEnum, IsNumberString, IsOptional, IsString, Matches, validateSync } from 'class-validator';
import { NodeEnv } from '..';

export class EnvironmentVariablesClass {
  @IsEnum(NodeEnv)
  public NODE_ENV: NodeEnv;

  @IsNumberString()
  public PORT: string;

  @IsOptional()
  @IsString()
  public HOST: string;

  @Matches(/^mongodb:\/\/.+/)
  public MONGODB_URI: string;

  @IsOptional()
  @IsString()
  public JWT_SECRET?: string;

  @IsString()
  public NCP_ACCESS_KEY: string;

  @IsString()
  public NCP_SECRET_KEY: string;

  @IsString()
  public NCP_SMS_SERVICE_ID: string;

  @IsNumberString()
  public NCP_SMS_SENDER: string;

  constructor(env: Record<string, string>) {
    Object.assign(this, env);
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw errors[0];
    }
  }
}
