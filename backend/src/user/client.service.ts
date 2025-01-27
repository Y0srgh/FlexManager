import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { BaseService } from 'src/base/base.service';
import { CreateClientDto } from './dto/create-client.dto';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from './user.service';

@Injectable()
export class ClientService extends BaseService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    protected passwordService: PasswordService,

    protected userService: UserService,
  ) {
    super(clientRepository, userService, passwordService);
  }

  async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
    return this.createWithUser(createClientDto);
  }
}
