import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from './user.service';
import { ParentChildRequestEntity } from './entities/parent-child.entity';
import { EmailService } from 'src/common/utils/email.service';
import { Roles } from 'src/enums/user-role.enum';

@Injectable()
export class ParentChildRequestService extends BaseService<ParentChildRequestEntity> {
  constructor(
    @InjectRepository(ParentChildRequestEntity)
    private readonly parentChildRepository: Repository<ParentChildRequestEntity>,

    protected passwordService: PasswordService,

    protected userService: UserService,

    private readonly emailService: EmailService,
  ) {
    super(parentChildRepository, userService, passwordService);
  }

  async updateRequestStatus(
    requestId: string,
    status: 'approved' | 'rejected',
    role: Roles,
  ) {
    const request = await this.parentChildRepository.findOne({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException(`Request with ID ${requestId} not found`);
    }

    request.status = status;
    if (role === Roles.CLIENT) {
      await this.emailService.sendParentAssociationResponseEmail(
        request.parent.user.email,
        request.child.user.username,
        request.status,
      );
    } else if (role === Roles.PARENT) {
      await this.emailService.sendRevokeAssociationResponseEmail(
        request.child.user.email,
        request.parent.user.username,
      );
    } else {
      throw new NotFoundException(`Role not found`);
    }
    await this.parentChildRepository.save(request);
  }

  async getParentPendingRequests(parentId: string) {
    const requests = await this.parentChildRepository.find({
      where: { parent: { id: parentId }, status: 'pending' },
      relations: ['child'],
    });

    return requests.map((request) => ({
      id: request.id,
      status: request.status,
      parent: {
        id: request.child.id,
        username: request.child.user.username,
        email: request.child.user.email,
        phone: request.child.user.phone,
      },
      role: Roles.PARENT,
    }));
  }

  async getChildPendingRequests(childId: string) {
    const requests = await this.parentChildRepository.find({
      where: { child: { id: childId }, status: 'pending' },
      relations: ['parent'],
    });

    return requests.map((request) => ({
      id: request.id,
      status: request.status,
      parent: {
        id: request.parent.id,
        username: request.parent.user.username,
        email: request.parent.user.email,
        phone: request.parent.user.phone,
      },
      role: Roles.CLIENT,
    }));
  }
}
