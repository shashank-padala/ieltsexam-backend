import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],  // ✅ Import PrismaModule to interact with DB
  controllers: [ReadingController],
  providers: [ReadingService],
})
export class ReadingModule {}
