import { Injectable } from '@nestjs/common';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { UpdateMessengerDto } from './dto/update-messenger.dto';
import { MessengerRepo } from "./messenger.repository"
import { UserEntity } from 'src/user/entities/user.entity';
import { Messenger } from './entities/messenger.entity';
@Injectable()
export class MessengerService {
 constructor(private readonly  messengerRepo :MessengerRepo){

 }
  

  async create(createMessenger: Partial<Messenger>) : Promise<Messenger> {
    return await this.messengerRepo.create(createMessenger);
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
