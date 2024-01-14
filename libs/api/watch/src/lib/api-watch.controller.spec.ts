import { Test } from '@nestjs/testing';
import { ApiWatchController } from './api-watch.controller';
import { ApiWatchService } from './api-watch.service';

describe('ApiWatchController', () => {
  let controller: ApiWatchController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWatchService],
      controllers: [ApiWatchController],
    }).compile();

    controller = module.get(ApiWatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
