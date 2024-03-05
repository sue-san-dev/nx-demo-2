import { Test } from '@nestjs/testing';
import { ApiFileUploadController } from './api-file-upload.controller';
import { ApiFileUploadService } from './api-file-upload.service';

describe('ApiFileUploadController', () => {
  let controller: ApiFileUploadController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFileUploadService],
      controllers: [ApiFileUploadController],
    }).compile();

    controller = module.get(ApiFileUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
