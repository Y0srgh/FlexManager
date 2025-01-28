import {WebSocketGateway,SubscribeMessage,MessageBody,WebSocketServer,ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessengerService } from './messenger.service';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { UpdateMessengerDto } from './dto/update-messenger.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessengerGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messengerService: MessengerService,
  
  ) {}
  @SubscribeMessage('joinRoom')
  joinRoom(
    @MessageBody() { senderId, receiverId }: { senderId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const roomName = this.getRoomName(senderId, receiverId);
    client.join(roomName);
    return { message: `Joined room ${roomName}` };
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() createMessengerDto: CreateMessengerDto,
  ) {
    const { senderId, receiverId, content } = createMessengerDto;
    const roomName = this.getRoomName(senderId, receiverId);
    const message = await this.messengerService.create(createMessengerDto);
    this.server.to(roomName).emit('newMessage', message);
    console.log(message)
    return message;
  }
  @SubscribeMessage('getConversation')
  async getConversation(
    @MessageBody() { senderId, receiverId }: { senderId: string; receiverId: string },
  ) {
    return this.messengerService.findConversation(senderId, receiverId);
  }
  private getRoomName(senderId: string, receiverId: string): string {
    return [senderId, receiverId].sort().join('_'); // Ensure consistent room naming
  }
}
