import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSingUpDto } from './dto/user-sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserSingInDto } from './dto/user-sign-in.dto';
import { CoachEntity } from './entities/coach.entity';
import { Roles } from 'src/enums/user-role.enum';
import { CreateCoachDto } from './dto/create-coach.dto';
import { PasswordService } from 'src/common/utils/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    
    @InjectRepository(CoachEntity)
    private coachRepository: Repository<CoachEntity>,

    private jwtService: JwtService,

    private passwordService: PasswordService,
  ) {}






  async signUp(data: UserSingUpDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...data,
    });
    
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
    // recuperer login et mot de passe
    const { username, email, password } = credientials;
    console.log(credientials);
    
    // on peut se logger via username ou email
    // verifier si user existe
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username OR user.email = :email', {
        username,
        email,
      })
      .getOne();
    // si non on retourne une erreur
    if (!user)
      throw new NotFoundException('username or email or password is incorrect');
    // si oui on verifie si le mot de passe est correcte
    const hashedPassword = await bcrypt.hash(password, user.salt);

    if (hashedPassword === user.password) {
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
      throw new NotFoundException('username or email or password is incorrect');
    }
    // si non on retourne une erreur
  }


  async createCoach(createCoachDto: CreateCoachDto): Promise<CoachEntity> {
    const defaultPassword = this.passwordService.generateDefaultPassword();
    const signupCoach: UserSingUpDto = {username: createCoachDto.username, email: createCoachDto.email, role : createCoachDto.role, password: defaultPassword} as UserSingUpDto;

    const user = await this.signUp(signupCoach);
    

    const coach = this.coachRepository.create({
      expertise: createCoachDto.expertise,
      certifications: createCoachDto.certifications,
      isPrivate: createCoachDto.isPrivate,
      id: user.id,
      user: user,
      courses: []
    });

    return this.coachRepository.save(coach);
  }


  async findAllCoaches(): Promise<CoachEntity[]> {
    return this.coachRepository.find();
  }

  // async findOneCoach(id: string): Promise<CoachEntity> {
  //   return this.coachRepository.findOne({ where: { id } });
  // }

 

}
