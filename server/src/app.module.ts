import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { PayModule } from './pay/pay.module';

@Module({
  imports: [ChatModule, PayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
