import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PrivateSessionService } from './private-session.service';
import { PrivateSession } from './entities/private-session.entity';

@Controller('private')
export class PrivateSessionController {
  constructor(private readonly privateSessionService: PrivateSessionService) {}

  @Post()
  async create(@Body() data: Partial<PrivateSession>): Promise<PrivateSession> {
    return this.privateSessionService.create(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PrivateSession> {
    return this.privateSessionService.findOne(id);
  }
  @Get('')
  async findAll(): Promise<PrivateSession[]> {
    return this.privateSessionService.findAll();
  }
}
