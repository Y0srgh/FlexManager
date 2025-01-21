import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoachEntity } from './entities/coach.entity';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(CoachEntity)
    private readonly coachRepository: Repository<CoachEntity>,
  ) {}

  async create(createCoachDto: CreateCoachDto): Promise<CoachEntity> {
    const coach = this.coachRepository.create(createCoachDto);
    return this.coachRepository.save(coach);
  }

  async findAll(): Promise<CoachEntity[]> {
    return this.coachRepository.find({ relations: ['courses'] });
  }

  async findOne(id: string): Promise<CoachEntity> {
    return this.coachRepository.findOne({ where: { id }, relations: ['courses'] });
  }

  async update(id: string, updateCoachDto: UpdateCoachDto): Promise<CoachEntity> {
    await this.coachRepository.update(id, updateCoachDto);
    return this.coachRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.coachRepository.delete(id);
  }
}
