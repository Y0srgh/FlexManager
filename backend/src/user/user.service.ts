import {
  ConflictException,
  ForbiddenException,
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
import { Request, Response } from 'express';
import { BaseService } from 'src/base/base.service';
import { PasswordService } from 'src/common/utils/password.service';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    protected passwordService: PasswordService,

    private jwtService: JwtService,
  ) {
    super(userRepository, null, passwordService);
  }

  async signUp(data: UserSingUpDto): Promise<UserEntity> {
    console.log('datas ', data);

    const userExist = await this.userRepository.findOne({
      where: [{ username: data.username }, { email: data.email }],
    });

    if (userExist) {
      throw new ConflictException('username or email already exist');
    }

    const user = this.userRepository.create({
      ...data,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    console.log('user from signup', user);

    try {
      await this.userRepository.save(user);
      delete user.salt;
      delete user.password;

      const tokens = await this.getTokens(user.username, user.email, user.role);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return user; //tokens.access
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
        access_token: jwt,
      };
    } else {
      throw new UnauthorizedException('Incorrect credentials');
    }
    // si non on retourne une erreur
  }
}*/

  // async signIn(credientials: UserSingInDto, response: Response) {
  //   const { email, password } = credientials;

  //   const user = await this.userRepository
  //     .createQueryBuilder('user')
  //     .where('user.username = :email OR user.email = :email', {
  //       email,
  //     })
  //     .getOne();

  //   if (!user) throw new UnauthorizedException('Incorrect credentials');

  //   if (await bcrypt.compare(password, user.password)) {
  //     const payload = {
  //       username: user.username,
  //       email: user.email,
  //       role: user.role,
  //     };

  //     const accessToken = await this.jwtService.signAsync(payload, {
  //       expiresIn: '15m',
  //     });

  //     const refreshToken = await this.jwtService.signAsync(
  // { ...payload, tokenType: 'refresh' },
  // {
  //   expiresIn: '7d',
  // },
  //     );

  //     console.log('refresh token', refreshToken);

  //     response.cookie('refresh_token', refreshToken, {
  //       httpOnly: true,
  //       // secure: false,
  //       sameSite: 'strict',
  //       maxAge: 7 * 24 * 60 * 60 * 1000,
  //       path: '/refresh',
  //     });

  //     return {
  //       access_token: accessToken,
  //     };
  //   } else {
  //     throw new UnauthorizedException('Incorrect credentials');
  //   }
  // }

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
      const tokens = await this.getTokens(user.username, user.email, user.role);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      response.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return { accessToken: tokens.accessToken };
    } else {
      throw new UnauthorizedException('Incorrect credentials');
    }
  }
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(username: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          username,
          email,
          role,
        },
        {
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { username, email, role, tokenType: 'refresh' },
        {
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // async refreshToken(request: Request, response: Response) {
  //   try {
  //     const refreshToken = request.cookies['refresh_token'];

  //     if (!refreshToken) {
  //       throw new UnauthorizedException('Refresh token not found');
  //     }

  //     const payload = await this.jwtService.verifyAsync(refreshToken);

  //     if (payload.tokenType !== 'refresh') {
  //       throw new UnauthorizedException('Invalid refresh token');
  //     }

  //     const newAccessToken = await this.jwtService.signAsync(
  //       {
  //         username: payload.username,
  //         email: payload.email,
  //         role: payload.role,
  //       },
  //       {
  //         expiresIn: '15m',
  //       },
  //     );

  //     return {
  //       access_token: newAccessToken,
  //     };
  //   } catch (error) {
  //     response.clearCookie('refresh_token');
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.username, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens.accessToken;
  }
}
