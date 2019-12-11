import { IsBase64, IsString } from 'class-validator';

export class File {
  @IsString()
  public name: string;
  @IsBase64()
  public body: string;
}
