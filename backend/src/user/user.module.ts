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
import { ParentService } from './parent.service';
import { ParentEntity } from './entities/parents.entity';
import { ParentChildRequestEntity } from './entities/parent-child.entity';
import { ParentChildRequestService } from './parent-child-request.service';
dotenv.config()

@Module({
   imports: [
    TypeOrmModule.forFeature([UserEntity, CoachEntity, ClientEntity, ManagerEntity, ParentEntity, ParentChildRequestEntity]),
    PassportModule.register({defaultStrategy: 'jwt-refresh'}),
    JwtModule.register({
      secret: process.env.SECRET,
      // signOptions: {
      //   expiresIn: 3600,//1 heure
      // },
    }),
],
  controllers: [UserController],
  providers: [UserService, JwtStrategy,CoachService, ClientService, ManagerService, ParentService, ParentChildRequestService],
})
export class UserModule {}
