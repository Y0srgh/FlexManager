import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSingUpDto } from './dto/user-sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserSingInDto } from './dto/user-sign-in.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private jwtService: JwtService,
  ) {}

  async signUp(data: UserSingUpDto): Promise<UserEntity> {
    console.log('datas ', data);

    const user = this.userRepository.create({
      ...data,
    });

    console.log('user from signup', user);

    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
      delete user.salt;
      delete user.password;
      return user;
    } catch (error) {
      throw new ConflictException('username or email already exist');
    }
  }

  /*async signIn(credientials: UserSingInDto) {
    const { username, email, password } = credientials;
    console.log(credientials);

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :email OR user.email = :email', {
        email,
      })
      .getOne();
    console.log('-------------------', user);

    // si non on retourne une erreur
    if (!user) throw new UnauthorizedException('Incorrect credentials');
    // si oui on verifie si le mot de passe est correcte

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const jwt = await this.jwtService.signAsync(payload);
      return {
        accessToken: jwt,
      };
    } else {
      throw new UnauthorizedException('Incorrect credentials');
    }
    // si non on retourne une erreur
  }
}*/

  async signIn(credientials: UserSingInDto, response: Response) {
    const { email, password } = credientials;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :email OR user.email = :email', {
        email,
      })
      .getOne();

    if (!user) throw new UnauthorizedException('Incorrect credentials');

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      });

      const refreshToken = await this.jwtService.signAsync(
        { ...payload, tokenType: 'refresh' },
        {
          expiresIn: '7d',
        },
      );

      console.log("refresh token", refreshToken);
      const tokens = user.refreshToken || [];
      // tokens.push(refreshToken);
      user.refreshToken =  refreshToken;
      await this.userRepository.save(user);
      
      // response.cookie('refreshToken', refreshToken, {
      //   httpOnly: true,
      //   // secure: false,
      //   sameSite: 'lax',
      //   secure: process.env.NODE_ENV === 'production',
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      // });
      
      console.log("access token---------------------------------------", accessToken);
      console.log("user", user);
      

      return {
        accessToken: accessToken,
      };
    } else {
      throw new UnauthorizedException('Incorrect credentials');
    }
  }
}


