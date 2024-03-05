import { Test } from '@nestjs/testing';
import { ApiFileUploadService } from './api-file-upload.service';

describe('ApiFileUploadService', () => {
  let service: ApiFileUploadService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFileUploadService],
    }).compile();

    service = module.get(ApiFileUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
