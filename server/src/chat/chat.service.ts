import { Injectable } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { MyLogger } from 'src/utils/logging';
import { Server } from 'socket.io';

@Injectable()
export class ChatService {
  private readonly logger = new MyLogger(ChatService.name);

  constructor(private readonly agentService: AgentService) {}

  userConnect(server: Server, client: any): void {
    this.logger.begin('User Connected');
    client.join('chat');
    this.logger.agent('How can I assist you today?');
    server.to('chat').emit('chat', 'Agent: How can I assist you today?');
  }

  handleMessage(server: Server, client: any, message: string): void {
    this.agentService.agent(server, message);
  }
}
