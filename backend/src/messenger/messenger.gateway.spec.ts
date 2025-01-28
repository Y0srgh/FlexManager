import { Test, TestingModule } from '@nestjs/testing';
import { MessengerGateway } from './messenger.gateway';
import { MessengerService } from './messenger.service';

describe('MessengerGateway', () => {
  let gateway: MessengerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessengerGateway, MessengerService],
    }).compile();

    gateway = module.get<MessengerGateway>(MessengerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
