import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachEntity } from './entities/coach.entity';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CoachEntity])],
  controllers: [CoachController],
  providers: [CoachService],
})
export class CoachModule {}
