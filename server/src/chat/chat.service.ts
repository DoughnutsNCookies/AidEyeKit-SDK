import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  userConnect(client: any): void {
    client.join('chat');
    console.log('user connected');
  }
}
