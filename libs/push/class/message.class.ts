import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class Message {
  @IsOptional()
  @IsString()
  public subject?: string;

  @IsOptional()
  @IsString()
  public content?: string;

  @IsNumberString()
  public to: string;
}
