import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProgressTrackingService } from './progress-tracking.service';
import { User } from 'src/decorators/user.decorator';
import { Role } from 'src/decorators/role.decorator';
import { Roles } from 'src/enums/user-role.enum';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user/guards/role.guard';

@Controller('progress')
export class ProgressTrackingController {
  constructor(private readonly progressService: ProgressTrackingService) {}

  @Get()
//   @Role(Roles.CLIENT)
//   @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserProgress(@User() user) {
    console.log(' i am in the controller', user);

    return this.progressService.getProgressHistory(user.id);
  }
}
