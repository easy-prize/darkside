import { ContentType } from '../enum/content-type.enum';
import { Status } from '../enum/status.enum';

export interface MessageResult {
  requestId: string;
  requestTime: string;
  statusCode: string;
  statusName: string;
  statusMessage: string;
  messages: Array<{
    messageId: string;
    from: string;
    to: string;
    contentType: ContentType,
    countryCode: string;
    requestId: string;
    statusCode: string;
    statusName: string;
    statusMessage: string;
    status: Status;
    completeTime: string;
    content: string;
    telcoCode: string;
  }>;
}
