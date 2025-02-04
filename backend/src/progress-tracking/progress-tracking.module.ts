import { Module } from '@nestjs/common';
import { ProgressTrackingController } from './progress-tracking.controller';
import { ProgressTrackingService } from './progress-tracking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, UserEntity]),

    PassportModule.register({ defaultStrategy: 'jwt-refresh' }),
    JwtModule.register({
      secret: process.env.SECRET,
      // signOptions: {
      //   expiresIn: 3600,//1 heure
      // },
    }),
],
  controllers: [ProgressTrackingController],
  providers: [ProgressTrackingService, UserService, JwtService],
  exports: [ProgressTrackingService],
})
export class ProgressTrackingModule {}
