import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from './user.service';
import { ParentChildRequestEntity } from './entities/parent-child.entity';

@Injectable()
export class ParentChildRequestService extends BaseService<ParentChildRequestEntity> {
  constructor(
    @InjectRepository(ParentChildRequestEntity)
    private readonly parentChildRepository: Repository<ParentChildRequestEntity>,

    protected passwordService: PasswordService,

    protected userService: UserService,
  ) {
    super(parentChildRepository, userService, passwordService);
  }

  async updateRequestStatus(
    requestId: string,
    status: 'approved' | 'rejected',
  ) {
    const request = await this.parentChildRepository.findOne({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException(`Request with ID ${requestId} not found`);
    }

    request.status = status;
    await this.parentChildRepository.save(request);
  }

  async getParentPendingRequests(parentId: string) {
    return this.parentChildRepository.find({
      where: { parent: { id: parentId }, status: 'pending' },
      relations: ['child'],
    });
  }

  async getChildPendingRequests(childId: string) {
    return this.parentChildRepository.find({
      where: { child: { id: childId }, status: 'pending' },
      relations: ['parent'],
    });
  }
}
