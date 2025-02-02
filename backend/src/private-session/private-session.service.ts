import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { PrivateSession } from './entities/private-session.entity';

@Injectable()
export class PrivateSessionService extends BaseService<PrivateSession> {
  constructor(
    @InjectRepository(PrivateSession)
    private readonly privateSessionRepository: Repository<PrivateSession>,
  ) {
    super(privateSessionRepository);
  }
  findAll() {
    return this.privateSessionRepository.find({
      relations: ['course', 'coach'],
    });
  }
  
}
