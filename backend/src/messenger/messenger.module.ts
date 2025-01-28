import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerGateway } from './messenger.gateway';

@Module({
  providers: [MessengerGateway, MessengerService],
})
export class MessengerModule {}
