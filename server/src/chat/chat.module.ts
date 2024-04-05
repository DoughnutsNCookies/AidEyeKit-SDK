import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { AgentService } from 'src/agent/agent.service';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, AgentService],
})
export class ChatModule {}
