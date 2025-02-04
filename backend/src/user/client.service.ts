import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { BaseService } from 'src/base/base.service';
import { CreateClientDto } from './dto/create-client.dto';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from './user.service';
import { ProgressTrackingService } from '../progress-tracking/progress-tracking.service';
import { TrackEntity } from 'src/progress-tracking/track.entity';

@Injectable()
export class ClientService extends BaseService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    protected passwordService: PasswordService,

    protected userService: UserService,

    
    protected progressTrackingService : ProgressTrackingService
    

  ) {
    super(clientRepository, userService, passwordService);
  }

  async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const client = await this.createWithUser(createClientDto, () => ({
      physicalDetails: createClientDto.physicalDetails,
      nutritionAssistanceType: createClientDto.nutritionAssistanceType,
      goal: createClientDto.goal,
      gender: createClientDto.gender,
    }));

    try {
      const progressTracking = await this.progressTrackingService.create({client, weight : client.physicalDetails.weight})
      console.log('---------------------------progressTracking',progressTracking);
      
    } catch (error) {
      console.log(error);
      
    }
 
    return client;
  }
}
