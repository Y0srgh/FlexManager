import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerGateway } from './messenger.gateway';
import { MessengerRepo } from './messenger.repository';
import { Messenger } from './entities/messenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessengerController } from './messenger.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Messenger])],
  controllers : [MessengerController],
  providers: [MessengerGateway, MessengerService,MessengerRepo],
})
export class MessengerModule {}
