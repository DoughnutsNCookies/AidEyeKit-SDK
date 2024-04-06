import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: any, ...args: any[]) {
    this.chatService.userConnect(this.server, client);
  }

  @SubscribeMessage('chat')
  handleMessage(client: any, message: string) {
    this.chatService.handleMessage(this.server, client, message);
  }
}
