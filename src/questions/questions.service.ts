import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async getExamQuestions(examId: string, module: string) {
    return this.prisma.question.findMany({
      where: {
        examId,
        module: module as any
      },
      orderBy: { createdAt: 'asc' }
    });
  }
}