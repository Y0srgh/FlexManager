import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParentEntity } from './entities/parents.entity';
import { BaseService } from 'src/base/base.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from './user.service';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ParentService extends BaseService<ParentEntity> {
  constructor(
    @InjectRepository(ParentEntity)
    private readonly parentRepository: Repository<ParentEntity>,

    protected passwordService: PasswordService,

    protected userService: UserService,
  ) {
    super(parentRepository, userService, passwordService);
  }

  async createParent(createParentDto: CreateParentDto, child: ClientEntity): Promise<ParentEntity> {
    return this.createWithUser(createParentDto, (user) => ({
        children: [child],
        associatedAccountsCount: 1,
    }));
  }
}
