import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSingUpDto } from './dto/user-sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserSingInDto } from './dto/user-sign-in.dto';
import { UserSignInValidationPipe } from 'src/pipes/signin/user-sing-in.pipe';
import { CreateCoachDto } from './dto/create-coach.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { User } from 'src/decorators/user.decorator';
import { Roles } from 'src/enums/user-role.enum';
import { Role } from 'src/decorators/role.decorator';
import { RolesGuard } from './guards/role.guards';
import { CreateClientDto } from './dto/create-client.dto';
import { CoachService } from './coach.service';
import { ClientService } from './client.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerService } from './manager.service';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly coachService: CoachService,
    private readonly clientService: ClientService,
    private readonly managerService: ManagerService,
  ) {}

  @Post('signup')
  async signUp(@Body() userData: UserSingUpDto): Promise<UserEntity> {
    return this.userService.signUp(userData);
  }

  @Post('signin')
  async signIn(@Body(UserSignInValidationPipe) userData: UserSingInDto) {
    console.log('i am heree');

    return this.userService.signIn(userData);
  }

  //principe : definir les "fonctionnalités" de tous les utilisateur ici et restreindre l'accès en fonction du role de l'utilisateur (RBAC)
  //exemple :
  // @Post('manager')
  // @UseGuards(JwtAuthGuard)
  // async admin(@User({ roles: [Roles.MANAGER] }) user: UserEntity) {....}

  @Post('create-coach')
  @Role(Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createCoach(@Body() createCoachDto: CreateCoachDto) {
    console.log('i am in the controller');

    return this.coachService.createCoach(createCoachDto);
  }

  @Get('coach')
  findAllCoaches() {
    return this.coachService.findAll();
  }

  @Get('coach/:id')
  findOneCoach(@Param('id') id: string) {
    return this.coachService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
  //   return this.userService.update(id, updateCoachDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }

  //---------client
  @Post('create-client')
  @Role(Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createClient(@Body() CreateClientDto: CreateClientDto) {
    return this.clientService.createClient(CreateClientDto);
  }

  @Get('client')
  @Role(Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllClients() {
    return this.clientService.findAll();
  }

  @Get('client/:id')
  findOneClient(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  //-------------manager
  @Post('create-manager')
  @Role(Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createManager(@Body() CreateManagerDto: CreateManagerDto) {
    return this.managerService.createManager(CreateManagerDto);
  }
}
