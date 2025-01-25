import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // CREATE
  @Post()
  async create(@Body() dto: CreateReservationDto): Promise<Reservation> {
    return this.reservationService.create(dto);
  }

  // READ ALL
  @Get()
  async findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  // READ ONE
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateReservationDto): Promise<Reservation> {
    return this.reservationService.update(id, dto);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.reservationService.remove(id);
  }
}
