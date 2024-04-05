import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/utils/logging';

@Injectable()
export class ChatService {
  private readonly logger = new MyLogger(ChatService.name);

  userConnect(client: any): void {
    this.logger.begin('User Connected');
  }
}
