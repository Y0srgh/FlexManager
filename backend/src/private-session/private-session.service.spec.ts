import { Test, TestingModule } from '@nestjs/testing';
import { PrivateSessionService } from './private-session.service';

describe('PrivateSessionService', () => {
  let service: PrivateSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateSessionService],
    }).compile();

    service = module.get<PrivateSessionService>(PrivateSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
