import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateSessionController } from './private-session.controller';
import { PrivateSessionService } from './private-session.service';
import { PrivateSession } from './entities/private-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateSession])],
  providers: [PrivateSessionService],
  controllers: [PrivateSessionController],
})
export class PrivateSessionModule {}
