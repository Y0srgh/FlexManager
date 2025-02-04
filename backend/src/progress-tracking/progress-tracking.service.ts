import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../user/entities/client.entity';
import { BaseService } from 'src/base/base.service';
import { CreateClientDto } from '../user/dto/create-client.dto';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from '../user/user.service';
import { TrackEntity } from './track.entity';

@Injectable()
export class ProgressTrackingService extends BaseService<TrackEntity> {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly progressTrackingRepository: Repository<TrackEntity>,

    protected passwordService: PasswordService,

    protected userService: UserService,
  ) {
    super(progressTrackingRepository, userService, passwordService);
  }
  async getProgressHistory(userId: string) {
    console.log(' i am here');
    
    const progress = await this.progressTrackingRepository.find({ where: { client: { id: userId } } });
    console.log(progress);
    return progress;
  }
}
