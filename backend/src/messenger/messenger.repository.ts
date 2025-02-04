import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Messenger } from './entities/messenger.entity';
@Injectable()
export class MessengerRepo {
    constructor(
      @InjectRepository(Messenger)
      private readonly MessengerRepo: Repository<Messenger>,
    ) {}
    async create(data: Partial<Messenger>) {
      return this.MessengerRepo.save(data);
    }
    async findByUserId(userId: string) {
      return this.MessengerRepo.find({
        where:  {senderId : userId } 
      })
    }
    async findById(msgId: string){
      return this.MessengerRepo.findOne({where : { id : msgId}})
    }
    async findConversation(senderId: string ,recieverId:string){
        return this.MessengerRepo.find(
            {where : {senderId : senderId, recipientId : recieverId}}
        )
    }
    async updateMessage(id: string, data: Partial<Messenger>) {
      return this.MessengerRepo.update(id, data);
    }
    async removeMsg(id: string) {
      return this.MessengerRepo.delete({ id });
    }
  }