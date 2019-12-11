import { ConfigService } from '@app/config';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import * as CryptoJS from 'crypto-js';
import { File } from './class/file.class';
import { MessageRequest } from './class/message-request.class';
import { ContentType } from './enum/content-type.enum';
import { MessageType } from './enum/message-type.enum';
import { MessageResult } from './interface/message-result.interface';

@Injectable()
export class PushService {
  @Inject()
  private readonly httpService: HttpService;
  private readonly smsServiceId: string;
  private readonly smsSender: string;
  private readonly accessKey: string;
  private readonly secretKey: string;

  constructor(config: ConfigService) {
    this.smsServiceId = config.ncpSms.serviceId;
    this.smsSender = config.ncpSms.sender;
    this.accessKey = config.ncp.accessKey;
    this.secretKey = config.ncp.secretKey;
  }

  public async sendMessage(to: string[], text: string, file?: File[]): Promise<MessageResult> {
    return this.send(new MessageRequest({
      content: text,
      contentType: ContentType.common,
      files: file,
      from: this.smsSender,
      messages: to.map((i) => ({
        to: i.toString(),
      })),
      type: file ? MessageType.mms : (text.length < 140 ? MessageType.sms : MessageType.lms),
    }));
  }

  private async send(request: MessageRequest): Promise<MessageResult> {
    const endpoint = `/sms/v2/services/${escape(this.smsServiceId)}/messages`;
    await validateOrReject(request);
    return (await this.httpService.post<MessageResult>(endpoint, classToPlain(request), {
      baseURL: 'https://sens.apigw.ntruss.com',
      headers: {
        'Content-Type': 'application/json',
        ...this.header('POST', endpoint),
      },
    }).toPromise()).data;
  }

  private header(method: string, url: string) {
    const timestamp = new Date().getTime();
    return {
      'x-ncp-apigw-signature-v2': CryptoJS.HmacSHA256(`${method} ${url}\n${timestamp}\n${this.accessKey}`, {
        secret: this.secretKey,
      }.secret).toString(CryptoJS.enc.Base64),
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-iam-access-key': this.accessKey,
    };
  }
}
