import { Test } from '@nestjs/testing';
import { ApiWatchService } from './api-watch.service';

describe('ApiWatchService', () => {
  let service: ApiWatchService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWatchService],
    }).compile();

    service = module.get(ApiWatchService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
