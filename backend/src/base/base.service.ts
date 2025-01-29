import { DeepPartial, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PasswordService } from 'src/common/utils/password.service';
import { UserSingUpDto } from 'src/user/dto/user-sign-up.dto';

@Injectable()
export class BaseService<T> {
  constructor(
    private readonly repository: Repository<T>,
    protected readonly userService?: any,
    protected readonly passwordService?: any,
  ) {}

  async create(data: Partial<T>): Promise<T> {
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
      } as UserSingUpDto;

      const user = await this.userService.signUp(signupCoach);

      console.log('extract user', extraData(user));

      const newUser = this.repository.create({
        ...extraData(user),
        id: user.id,
        user: user,
      } as DeepPartial<T>);
      console.log('i am here', newUser);

      return this.repository.save(newUser);
    } catch (error) {
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

  async update(id: string, data: Partial<T>): Promise<T> {
    const entity = await this.findOne(id);
    Object.assign(entity, data);
    return this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
