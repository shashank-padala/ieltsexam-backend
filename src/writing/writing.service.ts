import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WritingService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get all Writing tasks for an exam
  async getWritingTasks(examId: string) {
    return this.prisma.writingTask.findMany({
      where: { examId },
    });
  }

  // ✅ Get a single Writing task by ID
  async getWritingTaskById(taskId: string) {
    return this.prisma.writingTask.findUnique({
      where: { id: taskId },
    });
  }

  // ✅ Create a new Writing task (Task 1 or Task 2)
  async createWritingTask(examId: string, taskNumber: number, question: string) {
    return this.prisma.writingTask.create({
      data: {
        examId,
        taskNumber,
        question,
      },
    });
  }
}
