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
    async create(data: Partial<Messenger>) : Promise<Messenger> {
      return await this.MessengerRepo.save(data);
    }
    async findByUserId(userId: string) {
      return this.MessengerRepo.find({
        where:  {senderId : userId } 
      })
    }
    async findById(msgId: string){
      return this.MessengerRepo.findOne({where : { id : msgId}})
    }
    public async findConversation(roomId : string){
        return await this.MessengerRepo.find(
            {where : { roomId }}
        )
    }
    async updateMessage(id: string, data: Partial<Messenger>) {
      return this.MessengerRepo.update(id, data);
    }
    async removeMsg(id: string) {
      return this.MessengerRepo.delete({ id });
    }
  }