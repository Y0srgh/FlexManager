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

  async signIn(credientials: UserSingInDto) {
    const { username, email, password } = credientials;
    console.log(credientials);

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username OR user.email = :email', {
        username,
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
}
