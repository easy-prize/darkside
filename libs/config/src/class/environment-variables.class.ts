import { IsEnum, IsNumberString, IsOptional, IsString, Matches, validateSync } from 'class-validator';
import { NodeEnv } from '..';

// TODO: Remove Optional Decorator on variables starts with NCP

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

  @IsOptional()
  @IsString()
  public NCP_ACCESS_KEY: string;

  @IsOptional()
  @IsString()
  public NCP_SECRET_KEY: string;

  @IsOptional()
  @IsString()
  public NCP_SMS_SERVICE_ID: string;

  constructor(env: Record<string, string>) {
    Object.assign(this, env);
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw errors[0];
    }
  }
}
