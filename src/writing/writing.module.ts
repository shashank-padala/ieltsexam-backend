import { Module } from '@nestjs/common';
import { WritingService } from './writing.service';
import { WritingController } from './writing.controller';

@Module({
  providers: [WritingService],
  controllers: [WritingController]
})
export class WritingModule {}
