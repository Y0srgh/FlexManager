import { DeepPartial, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSingUpDto } from 'src/user/dto/user-sign-up.dto';
import { EmailService } from 'src/common/utils/email.service';
import { PasswordService } from 'src/common/utils/password.service';
import { UserService } from 'src/user/user.service';

export class BaseService<T> {
  constructor(
    private readonly repository: Repository<T>,
    protected readonly userService?: UserService,
    protected readonly passwordService?: PasswordService,
    protected readonly emailService?: EmailService,
  ) {}

  async create(data: Partial<T>): Promise<T> {
    console.log('---------------- daata ---------', data);

    const entity = this.repository.create(data as DeepPartial<T>);
    return this.repository.save(entity);
  }

  async createWithUser(
    createDto: any,
    extraData: (user: any) => Partial<T>,
  ): Promise<T> {
    try {
      console.log('the dto', createDto);

      const defaultPassword = this.passwordService.generateDefaultPassword();
      const signupCoach: UserSingUpDto = {
        username: createDto.username,
        email: createDto.email,
        role: createDto.role,
        password: createDto.password || defaultPassword,
        phone: createDto.phone,
      } as UserSingUpDto;

      console.log("coach----------------",signupCoach);
      

      var user = await this.userService.signUp(signupCoach);

      console.log('extract user', extraData(user));

      const newUser = this.repository.create({
        ...extraData(user),
        id: user.id,
        user: user,
      } as DeepPartial<T>);
      console.log('i am here', newUser);

      const savedUser = await this.repository.save(newUser);
      if (!createDto.password) {
        await this.emailService?.sendAddCoachEmail(
          signupCoach.email,
          defaultPassword,
        );
      }
      return savedUser;
    } catch (error) {
      if (user) {
        await this.repository.delete(user.id);
      }
      console.log('error-------------------------', error);
      throw error;
    }
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      throw new NotFoundException(`Entity with ID "${id}" not found`);
    }
    return entity;
  }
  //find by email
  async findByEmail(email: string): Promise<T> {
    const entity = await this.repository.findOne({
      where: { user: { email } } as any,
    });
    if (!entity) {
      throw new NotFoundException(`Entity with email "${email}" not found`);
    }
    return entity;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const entity = await this.findOne(id);
    Object.assign(entity, data);
    return this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.findOne(id);
    if (entity) {
      await this.repository.softDelete(id);
    }
  }
}
