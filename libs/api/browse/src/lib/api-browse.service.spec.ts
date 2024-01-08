import { Test } from '@nestjs/testing';
import { ApiBrowseService } from './api-browse.service';

describe('ApiBrowseService', () => {
  let service: ApiBrowseService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiBrowseService],
    }).compile();

    service = module.get(ApiBrowseService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
