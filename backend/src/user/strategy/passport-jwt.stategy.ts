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
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepositor: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: PayloadInterface) {
    console.log('i am in strategy', payload);
    const user = await this.userRepositor.findOne({
      where: { username: payload.username },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const refreshToken = req.cookies['refreshToken'];
    console.log('Refresh Token2----------------------------:', refreshToken);

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTime) {
      console.log('Access token expired, checking refresh token');

      if (!user.refreshToken || (user.refreshToken!=refreshToken)) {
        throw new UnauthorizedException('No refresh token found');
      }

      if(refreshToken){

        try {
          const refreshPayload = this.jwtService.verify(user.refreshToken, {
            secret: process.env.SECRET,
          });

          console.log('-----------------------------', refreshPayload.exp);
          const expirationDate = refreshPayload.exp * 1000;
          console.log("expiration", expirationDate);
          

          console.log('Token Expiration:', new Date(expirationDate).toLocaleString());
          console.log(new Date(Date.now()).toLocaleString());
          console.log(Date.now());
          console.log(currentTime);

          if (refreshPayload.exp < currentTime) {
            throw new UnauthorizedException('Refresh token expired');
          }

          // If refresh token is valid, generate a new access token
          const newAccessToken = this.jwtService.sign(
            { username: user.username, email: user.email, role: user.role },
            { secret: process.env.SECRET, expiresIn: '1m' },
          );

          console.log('New access token generated:', newAccessToken);

          delete user.password;
          delete user.salt;
          delete user.createdAt;
          delete user.updatedAt;
          delete user.deletedAt;
          // console.log('the user is', user, newAccessToken);
          req['accessToken'] = newAccessToken;
          return { ...user, newAccessToken };
        } catch (error) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }else{
        throw new UnauthorizedException('No refresh token found');
      }
    } else {
      delete user.password;
      delete user.salt;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.deletedAt;
      console.log('user without expired', user);

      return user;
    }
  }
}
