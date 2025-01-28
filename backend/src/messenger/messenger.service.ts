import { Injectable } from '@nestjs/common';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { UpdateMessengerDto } from './dto/update-messenger.dto';
import { MessengerRepo } from "./messenger.repository"
import { User } from './entities/user.entity';

@Injectable()
export class MessengerService {
  private messengerRepo :MessengerRepo
  create(createMessengerDto: CreateMessengerDto) : {} {
    return this.messengerRepo.create(createMessengerDto);
  }

  findOne(id: string) {
    return this.messengerRepo.findById(id);
  }

  update(id: string, updateMessengerDto: UpdateMessengerDto) {
    return this.messengerRepo.updateMessage(id,updateMessengerDto);
  }
  findConversation(senderId: string,recieverId: string){
    return this.messengerRepo.findConversation(senderId,recieverId);
  }
  remove(id: string) {
    return `This action removes a #${id} messenger`;
  }
}
