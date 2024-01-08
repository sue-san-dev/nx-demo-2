import { Module } from '@nestjs/common';
import { ApiSearchController } from './api-search.controller';
import { ApiSearchService } from './api-search.service';

@Module({
  controllers: [ApiSearchController],
  providers: [ApiSearchService],
  exports: [ApiSearchService],
})
export class ApiSearchModule {}
