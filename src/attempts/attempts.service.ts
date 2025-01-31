import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@Injectable()
export class AttemptsService {
  constructor(private prisma: PrismaService) {}

  async startAttempt(dto: CreateAttemptDto) {
    return this.prisma.attempt.create({
      data: {
        userId: dto.userId,
        examId: dto.examId,
        module: dto.module
      }
    });
  }

  async submitAnswers(attemptId: string, responses: any) {
    return this.prisma.attempt.update({
      where: { id: attemptId },
      data: {
        responses,
        completedAt: new Date()
      }
    });
  }
}