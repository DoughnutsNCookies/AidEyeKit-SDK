import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';
import { AgentService } from 'src/agent/agent.service';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection {
  constructor(
    private readonly chatService: ChatService,
    private readonly agentService: AgentService,
  ) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: any, ...args: any[]) {
    this.chatService.userConnect(client);
    this.agentService.agent();
  }
}
