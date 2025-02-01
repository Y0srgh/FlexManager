import { Test, TestingModule } from '@nestjs/testing';
import { PrivateSessionController } from './private-session.controller';
import { PrivateSessionService } from './private-session.service';

describe('PrivateSessionController', () => {
  let controller: PrivateSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateSessionController],
      providers: [PrivateSessionService],
    }).compile();

    controller = module.get<PrivateSessionController>(PrivateSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
