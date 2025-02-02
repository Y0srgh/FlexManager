import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSingUpDto } from './dto/user-sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserSingInDto } from './dto/user-sign-in.dto';
import { UserSignInValidationPipe } from 'src/pipes/signin/user-sing-in.pipe';
import { CreateCoachDto } from './dto/create-coach.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { Roles } from 'src/enums/user-role.enum';
import { Role } from 'src/decorators/role.decorator';
import { RolesGuard } from './guards/role.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { CoachService } from './coach.service';
import { ClientService } from './client.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerService } from './manager.service';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { Response, Request } from 'express';
import { ParentChildRequestService } from './parent-child-request.service';
@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly coachService: CoachService,
    private readonly clientService: ClientService,
    private readonly managerService: ManagerService,
    private readonly parentService: ParentService,
    private readonly parentChildService: ParentChildRequestService,
  ) {}

  @Post('signup')
  async signUp(@Body() userData: UserSingUpDto): Promise<UserEntity> {
    return this.userService.signUp(userData);
  }

  @Post('signin')
  async signIn(
    @Body(UserSignInValidationPipe) userData: UserSingInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('i am heree');

    return this.userService.signIn(userData, response);
  }

  //principe : definir les "fonctionnalités" de tous les utilisateur ici et restreindre l'accès en fonction du role de l'utilisateur (RBAC)
  //exemple :
  // @Post('manager')
  // @UseGuards(JwtAuthGuard)
  // async admin(@User({ roles: [Roles.MANAGER] }) user: UserEntity) {....}

  @Post('coach')
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
  // @Role(Roles.MANAGER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('client')
  createClient(@Body() createClientDto: CreateClientDto) {
    console.log('createClientDto', createClientDto);

    return this.clientService.createClient(createClientDto);
  }

  @Get('client')
  @Role(Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllClients(@Req() req: Request) {
    console.log('i am in find all clients');
    // console.log('Access Token from Header:', res.get('x-new-access-token'));
    return this.clientService.findAll();
  }

  @Get('client/:id')
  findOneClient(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  //-------------manager
  @Post('manager')
  @Role(Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createManager(@Body() CreateManagerDto: CreateManagerDto) {
    return this.managerService.createManager(CreateManagerDto);
  }

  @Get('manager')
  @Role(Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllManagers() {
    return this.managerService.findAll();
  }

  @Get('manager/:id')
  findOneManager(@Param('id') id: string) {
    return this.managerService.findOne(id);
  }

  //-----------parent
  // @Role(Roles.CLIENT)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('parent')
  createParent(@Body() createParentDto: CreateParentDto) {
    return this.parentService.createParent(createParentDto);
  }

  /*
  async getPendingRequests(parentId: string) {
    return this.parentChildRequestRepository.find({
      where: { parent: { id: parentId }, status: 'pending' },
      relations: ['child'],
    });
  }
  */

  /*-------Requests-----*/
  @Get('request')
  async getAllRequests() {
    return this.parentChildService.findAll();
  }

  @Get('request/pending-parent-request/:id')
  // @Role(Roles.PARENT)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async getParentPendingRequests(@Param('id') parentId: string) {
    return this.parentChildService.getParentPendingRequests(parentId);
  }

  @Get('request/pending-child-request')
  @Role(Roles.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getChildPendingRequests(@User() client) {
    console.log('i am here');
    
    return this.parentChildService.getChildPendingRequests(client.id);
  }

  @Patch('request/pending-child-request/:id/status')
  @Role(Roles.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRequestStatus(
    @Param('id') requestId: string,
    @Body('status') status: 'approved' | 'rejected',
  ) {
    return this.parentChildService.updateRequestStatus(requestId, status);
  }



  @Get('request/pending-child-request/:id')
  // @Role(Roles.CLIENT)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async getChildPendingRequestsId(@Param('id') id : string) {
    return this.parentChildService.getChildPendingRequests(id);
  }

}
