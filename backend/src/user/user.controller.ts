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

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() userData: UserSingUpDto): Promise<UserEntity> {
    return this.userService.signUp(userData);
  }

  @Post('signin')
  async signIn(@Body(UserSignInValidationPipe) userData: UserSingInDto) {
    return this.userService.signIn(userData);
  }


  //principe : definir les "fonctionnalités" de tous les utilisateur ici et restreindre l'accès en fonction du role de l'utilisateur (RBAC)
  //exemple :
  // @Post('manager')
  // @UseGuards(JwtAuthGuard)
  // async admin(@User({ roles: [Roles.MANAGER] }) user: UserEntity) {....}
 

  @Post('create-coach')
  @UseGuards(JwtAuthGuard)
  createCoach(@Body() createCoachDto: CreateCoachDto) {
    return this.userService.createCoach(createCoachDto);
  }

  @Get()
  findAllCoaches() {
    return this.userService.findAllCoaches();
  }

  @Get(':id')
  findOneCoach(@Param('id') id: string) {
    return this.userService.findOneCoach(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
  //   return this.userService.update(id, updateCoachDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }

}
