import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExamType, Module } from '@prisma/client';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get all available exams
  async getAllExams() {
    return this.prisma.exam.findMany({
      orderBy: {
        year: 'desc',
      },
    });
  }

  // ✅ Get a specific exam by ID (including its modules)
  async getExamById(id: string) {
    return this.prisma.exam.findUnique({
      where: { id },
      include: {
        modules: true,   // Includes Listening, Reading, Writing, Speaking
        passages: true,  // Includes Reading passages
        questions: true, // Includes Listening & Reading questions
        writingTasks: true, // Includes Writing tasks
        speakingQuestions: true, // Includes Speaking questions
      },
    });
  }

  // ✅ Create a new IELTS exam (e.g., Jan 2024, Feb 2024)
  async createExam(year: number, month: number, type: ExamType) {
    return this.prisma.exam.create({
      data: {
        year,
        month,
        type,
      },
    });
  }

  // ✅ Delete an exam (for admin use)
  async deleteExam(id: string) {
    return this.prisma.exam.delete({
      where: { id },
    });
  }
}
