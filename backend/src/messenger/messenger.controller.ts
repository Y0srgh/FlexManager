import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { Messenger } from './entities/messenger.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
@Controller('messages')
export class MessengerController {
  constructor(private readonly messengerService: MessengerService) {}

  /**
   * GET /messages/conversation?senderId=xxx&receiverId=yyy
   * Returns the conversation between two users.
   */
  @Get('conversation/:senderId/:recieverId')
//   @UseGuards(JwtAuthGuard)
  async getConversation(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ): Promise<Messenger[]> {
    return await this.messengerService.findConversation(senderId, receiverId);
  }



}