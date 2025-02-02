import { Module } from '@nestjs/common';
import { SpeakingService } from './speaking.service';
import { SpeakingController } from './speaking.controller';

@Module({
  providers: [SpeakingService],
  controllers: [SpeakingController]
})
export class SpeakingModule {}
