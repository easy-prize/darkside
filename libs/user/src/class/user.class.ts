import { IsDate, IsEmail, IsEnum, IsInstance, IsPhoneNumber, IsString } from 'class-validator';
import { Gender } from '..';

export class User {
  @IsString()
  public name: string;
  @IsEnum(Gender)
  public gender: Gender;
  @IsDate()
  public birth: Date;
  @IsEmail()
  public mail: string;
  @IsPhoneNumber('KR')
  public phone: string;
  @IsInstance(Buffer)
  public password: Buffer;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
