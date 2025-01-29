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
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepositor: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: PayloadInterface): Promise<UserEntity> {
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
    return user;
  }
}
