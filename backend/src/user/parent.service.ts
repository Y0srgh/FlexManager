import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParentEntity } from './entities/parents.entity';
import { BaseService } from 'src/base/base.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from './user.service';
import { ClientEntity } from './entities/client.entity';
import { ClientService } from './client.service';
import { UserEntity } from './entities/user.entity';
import { NotFoundError } from 'rxjs';
import { Roles } from 'src/enums/user-role.enum';
import { EmailService } from 'src/common/utils/email.service';

@Injectable()
export class ParentService extends BaseService<ParentEntity> {
  constructor(
    @InjectRepository(ParentEntity)
    private readonly parentRepository: Repository<ParentEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    protected userService: UserService,
    
    protected clientService: ClientService,
    
    protected passwordService: PasswordService,

    private readonly emailService: EmailService, 

  ) {
    super(parentRepository, userService, passwordService);
  }

  async createParent(createParentDto: CreateParentDto) {
    console.log('createParentDto', createParentDto);

    if (createParentDto.associatedAccountsCount && +createParentDto.associatedAccountsCount>0) {
      if (
        createParentDto.associatedAccountsCount !==
        createParentDto.childrenEmails.length
      ) {
        throw new NotFoundException(`Incoherent information`);
      }
      const children = await Promise.all(
        createParentDto.childrenEmails.map(async (childEmail) => {
          console.log(childEmail);

          const email = childEmail;
          const child = await this.userRepository.findOne({
            where: { email } as any,
          });
          if (!child) {
            throw new NotFoundException(
              `Child with ID ${childEmail} not found`,
            );
          }
          console.log('child ----------------------', child);
          
          if (child.role !== 'client') {
            throw new NotFoundException(
              `This is not a correct Sportsman email`,
            );
          }

          const childUsername = child.username;

          try {
            await this.emailService.sendParentAssociationEmail(
              childEmail,
              childUsername,
              createParentDto.username
            );
          } catch (error) {
            console.error(`Failed to send email to ${childEmail}:`, error);
          }
          return child;
        }),
      );

      createParentDto.childrenEmails = children.map((child) => child.id);
    }

    console.log(
      'createParentDto.childrenEmails',
      createParentDto.childrenEmails,
    );

    return this.createWithUser(createParentDto, (user) => ({
      children: createParentDto.childrenEmails?.map((id) => ({ id } as ClientEntity)),
      associatedAccountsCount: createParentDto.associatedAccountsCount,
      role: Roles.PARENT
    }));
  }
}
