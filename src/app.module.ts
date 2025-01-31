import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ExamsModule } from './exams/exams.module';
import { QuestionsModule } from './questions/questions.module';
import { AttemptsModule } from './attempts/attempts.module';

@Module({
  imports: [PrismaModule, UsersModule, ExamsModule, QuestionsModule, AttemptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
