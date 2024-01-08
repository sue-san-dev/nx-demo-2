import { Test } from '@nestjs/testing';
import { ApiSearchController } from './api-search.controller';
import { ApiSearchService } from './api-search.service';

describe('ApiSearchController', () => {
  let controller: ApiSearchController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiSearchService],
      controllers: [ApiSearchController],
    }).compile();

    controller = module.get(ApiSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
