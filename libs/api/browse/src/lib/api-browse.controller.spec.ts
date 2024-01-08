import { Test } from '@nestjs/testing';
import { ApiBrowseController } from './api-browse.controller';
import { ApiBrowseService } from './api-browse.service';

describe('ApiBrowseController', () => {
  let controller: ApiBrowseController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiBrowseService],
      controllers: [ApiBrowseController],
    }).compile();

    controller = module.get(ApiBrowseController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
