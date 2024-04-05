import {
  OnGatewayConnection,
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
    this.chatService.userConnect(client);
  }
}
