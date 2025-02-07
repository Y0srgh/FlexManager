import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerEntity } from './entities/manager.entity';
import { BaseService } from 'src/base/base.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from './user.service';
import { EmailService } from 'src/common/utils/email.service';

@Injectable()
export class ManagerService extends BaseService<ManagerEntity> {
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerRepository: Repository<ManagerEntity>,

    protected passwordService: PasswordService,

    protected userService: UserService,
        protected emailService: EmailService,
    
  ) {
    super(managerRepository, userService, passwordService, emailService);
  }

  async createManager(createManagerDto: CreateManagerDto): Promise<ManagerEntity> {
    return this.createWithUser(createManagerDto, (user) => ({
      facilityManagementAccess: createManagerDto.facilityManagementAccess,
      financialManagementAccess: createManagerDto.financialManagementAccess,
    }));
  }
}
