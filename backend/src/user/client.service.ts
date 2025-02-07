import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { BaseService } from 'src/base/base.service';
import { CreateClientDto } from './dto/create-client.dto';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from './user.service';
import { TrackEntity } from './entities/track.entity';
import { EmailService } from 'src/common/utils/email.service';

@Injectable()
export class ClientService extends BaseService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,

    protected passwordService: PasswordService,

    protected userService: UserService,

    protected emailService: EmailService,
  ) {
    super(clientRepository, userService, passwordService, emailService);
  }

  async getProgressHistory(userId: string) {
    console.log(' i am here');

    const progress = await this.trackRepository.find({
      where: { client: { id: userId } },
    });
    console.log(progress);
    return progress;
  }

  async createTrack(data: any): Promise<TrackEntity[]> {
    const entity = this.trackRepository.create(data);
    return this.trackRepository.save(entity);
  }

  async updateProgressHistory(userId: string, trackBody: any) {
    const client = await this.findOne(userId);
    console.log('trackBody', trackBody.caloriesBurned);

    const oldProgress = await this.trackRepository.findOne({
      where: { client: { id: client.id } },
      relations: ['client'],
      order: { createdAt: 'DESC' },
    });

    console.log('oldProgress----------------------------', oldProgress);

    const progress = new TrackEntity();
    console.log('initial progress', progress);

    progress.client = client;
    progress.weight =
      trackBody.weight !== undefined
        ? trackBody.weight
        : oldProgress?.weight || null;
    progress.muscleRate =
      trackBody.muscleRate !== undefined
        ? trackBody.muscleRate
        : oldProgress?.muscleRate || null;
    progress.caloriesBurned =
      trackBody.caloriesBurned !== undefined
        ? trackBody.caloriesBurned
        : oldProgress?.caloriesBurned || null;
    progress.fatRate =
      trackBody.fatRate !== undefined
        ? trackBody.fatRate
        : oldProgress?.fatRate || null;
    console.log('progress------------------------', progress);
    await this.trackRepository.save(progress);
    return progress;
  }

  async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const client = await this.createWithUser(createClientDto, () => ({
      physicalDetails: createClientDto.physicalDetails,
      nutritionAssistanceType: createClientDto.nutritionAssistanceType,
      goal: createClientDto.goal,
      gender: createClientDto.gender,
    }));

    try {
      const progressTracking = this.trackRepository.create({
        client,
        weight: client.physicalDetails.weight,
      });
      console.log(
        '---------------------------progressTracking',
        progressTracking,
      );
      await this.trackRepository.save(progressTracking)
    } catch (error) {
      console.log(error);
    }

    return client as ClientEntity;
  }
}
