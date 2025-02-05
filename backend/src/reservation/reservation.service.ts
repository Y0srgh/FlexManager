import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CoachEntity } from 'src/user/entities/coach.entity';
import { ClientEntity } from 'src/user/entities/client.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(CoachEntity)
    private readonly coachRepository: Repository<CoachEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  // CREATE
  async create(dto: CreateReservationDto): Promise<Reservation> {
    const coachEntity = await this.coachRepository.findOne({ where: { id: dto.coachId } });
    if (!coachEntity) throw new NotFoundException('Coach not found');
    if (!coachEntity.isPrivate) throw new Error('Coach is not private');
  
    const clientEntity = await this.clientRepository.findOne({ where: { id: dto.clientId } });
    if (!clientEntity) throw new NotFoundException('Client not found');
  
    // Create a new reservation instance
    const reservation = this.reservationRepository.create({
      date: dto.date,
      startTime: dto.startTime,
      endTime: dto.endTime,
      duration: dto.duration,
    });
  
    // Manually assign relations
    reservation.coachEntity = coachEntity;
    reservation.clientEntity = clientEntity;
  
    // Save the reservation
    return this.reservationRepository.save(reservation);
  }
  
  // READ ALL
  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({ relations: ['coachEntity', 'clientEntity'] });
  }

  // READ ONE
  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['coachEntity', 'clientEntity'],
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID "${id}" not found`);
    }

    return reservation;
  }

  // UPDATE
  async update(id: string, dto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.findOne(id);

    if (dto.coachId) {
      const coachEntity = await this.coachRepository.findOne({ where: { id: dto.coachId } });
      if (!coachEntity) throw new NotFoundException('Coach not found');
      if (!coachEntity.isPrivate) throw new Error('Coach is not private');
      reservation.coachEntity = coachEntity;
    }

    if (dto.clientId) {
      const clientEntity = await this.clientRepository.findOne({ where: { id: dto.clientId } });
      if (!clientEntity) throw new NotFoundException('Client not found');
      reservation.clientEntity = clientEntity;
    }

    Object.assign(reservation, dto);

    return this.reservationRepository.save(reservation);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationRepository.remove(reservation);
  }
}
