import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { User } from 'src/decorators/user.decorator';
import { Role } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user/guards/role.guard';
import { Roles } from 'src/enums/user-role.enum';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // CREATE
  @Post()
  async create(@Body() dto: CreateReservationDto): Promise<Reservation> {
    return this.reservationService.create(dto);
  }

  // READ ALL
  // @Get()
  // async findAll(): Promise<Reservation[]> {
  //   return this.reservationService.findAll();
  // }

  // READ ONE
  // @Get()
  // @Role(Roles.CLIENT)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // async findOne(@User() user: any): Promise<Reservation> {
  //   return this.reservationService.findOne(user.id);
  // }
  @Get()
@Role(Roles.CLIENT) 
@UseGuards(JwtAuthGuard, RolesGuard)
async findClientReservations(@User() user: any): Promise<Reservation[]> {
  console.log(this.reservationService.findByClientId(user.id));
  return this.reservationService.findByClientId(user.id);
}
@Get('/coach')
@Role(Roles.COACH) 
@UseGuards(JwtAuthGuard, RolesGuard)
async findCoachReservations(@User() user: any): Promise<Reservation[]> {
  console.log(this.reservationService.findByCoachId(user.id));
  return this.reservationService.findByCoachId(user.id);
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
