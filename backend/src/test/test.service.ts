import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from 'src/test/entities/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {

  constructor(@InjectRepository(Test)
  private readonly test: Repository<Test>) {
  }

  async getData() {
    return this.test.find();
  }
}
