import { ConfigService } from '@app/config';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import * as CryptoJS from 'crypto-js';
import { MessageRequest } from '../class/message-request.class';
import { ContentType } from '../enum/content-type.enum';
import { MessageType } from '../enum/message-type.enum';
import { MessageResult } from '../interface/message-result.interface';

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

  public async sendMessage(to: Array<number | string>, text: string) {
    const endpoint = `/sms/v2/services/${escape(this.smsServiceId)}/messages`;
    const sender: string = this.smsSender;
    const body = new MessageRequest({
      content: text,
      contentType: ContentType.common,
      from: sender,
      messages: to.map((i) => ({
        to: i.toString(),
      })),
      type: MessageType.sms,
    });
    await validateOrReject(body);
    return this.httpService.post<MessageResult>(endpoint, classToPlain(body), {
      baseURL: 'https://sens.apigw.ntruss.com',
      headers: {
        'Content-Type': 'application/json',
        ...this.header('POST', endpoint),
      },
    }).toPromise();
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
