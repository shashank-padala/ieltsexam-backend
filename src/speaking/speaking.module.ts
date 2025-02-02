import { Module } from '@nestjs/common';
import { SpeakingService } from './speaking.service';
import { SpeakingController } from './speaking.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ Import PrismaModule to interact with DB
  controllers: [SpeakingController],
  providers: [SpeakingService],
})
export class SpeakingModule {}
