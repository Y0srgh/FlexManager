
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoachEntity } from './entities/coach.entity';
import { BaseService } from 'src/base/base.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from './user.service';

@Injectable()
export class CoachService extends BaseService<CoachEntity>{
  constructor(
    @InjectRepository(CoachEntity)
    private readonly coachRepository: Repository<CoachEntity>,

    protected passwordService: PasswordService,

    protected userService: UserService,
  ) {
    super(coachRepository, userService, passwordService);
  }

  async createCoach(createCoachDto: CreateCoachDto): Promise<CoachEntity> {
    return this.createWithUser(
      createCoachDto,
      (user) => ({
        expertise: createCoachDto.expertise,
        certifications: createCoachDto.certifications,
        isPrivate: createCoachDto.isPrivate,
        courses: [],
      }),
    );
  }

/*async createCoach(createCoachDto: CreateCoachDto): Promise<CoachEntity> {
    const defaultPassword = this.passwordService.generateDefaultPassword();
    const signupCoach: UserSingUpDto = {username: createCoachDto.username, email: createCoachDto.email, role : createCoachDto.role, password: defaultPassword} as UserSingUpDto;

    const user = await this.userService.signUp(signupCoach);
    

    const coach = this.coachRepository.create({
      expertise: createCoachDto.expertise,
      certifications: createCoachDto.certifications,
      isPrivate: createCoachDto.isPrivate,
      id: user.id,
      courses: [],
      user: user,
    });

    return this.coachRepository.save(coach);
  }*/

  /*async findAllCoaches(): Promise<CoachEntity[]> {
    return this.coachRepository.find();
  }*/

  /*async findOneCoach(id: string): Promise<CoachEntity> {
    return this.coachRepository.findOne({ where: { id } });
  }*/
}