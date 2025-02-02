import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ExamsModule } from './exams/exams.module';
import { AttemptsModule } from './attempts/attempts.module';
import { ReadingModule } from './reading/reading.module';
import { ListeningModule } from './listening/listening.module';
import { WritingModule } from './writing/writing.module';
import { SpeakingModule } from './speaking/speaking.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    PrismaModule,
    ExamsModule,
    AttemptsModule,
    ReadingModule,
    ListeningModule,
    WritingModule,
    SpeakingModule,
    MediaModule,
  ],
  controllers: [AppController],  
  providers: [AppService],
})
export class AppModule {}
