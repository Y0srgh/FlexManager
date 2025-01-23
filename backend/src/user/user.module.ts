import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passport-jwt.stategy';
import { CoachEntity } from './entities/coach.entity';
import { ClientEntity } from './entities/client.entity';
import { CoachService } from './coach.service';
import { BaseService } from 'src/base/base.service';
import { ClientService } from './client.service';
import { ManagerService } from './manager.service';
import { ManagerEntity } from './entities/manager.entity';
dotenv.config()

@Module({
   imports: [
    TypeOrmModule.forFeature([UserEntity, CoachEntity, ClientEntity,ManagerEntity]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,//1 heure
      },
    }),
],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, CoachService, ClientService, ManagerService],
})
export class UserModule {}
