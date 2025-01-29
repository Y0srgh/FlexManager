import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PayloadInterface } from '../interface/payload.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepositor: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      ignoreExpiration: false,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: PayloadInterface): Promise<UserEntity> {
    console.log('i am in strategy');
    const user = await this.userRepositor.findOne({
      where: { username: payload.username },
    });
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    delete user.password;
    delete user.salt;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.deletedAt;
    console.log('the user is', user);

    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return {...user, refreshToken};
  }
}
