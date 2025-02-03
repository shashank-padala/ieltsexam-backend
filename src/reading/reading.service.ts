import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Module, QuestionType } from '@prisma/client';

@Injectable()
export class ReadingService {
  constructor(
    private prisma: PrismaService) {}

  // ✅ Get all Reading passages for an exam
  async getReadingPassages(examId: string) {
    return this.prisma.passage.findMany({
      where: { examId },
      include: {
        questions: true,  // ✅ Include related questions
      },
    });
  }

  // ✅ Get a single Reading passage with questions
  async getReadingPassageById(passageId: string) {
    return this.prisma.passage.findUnique({
      where: { id: passageId },
      include: { questions: true },
    });
  }

  // ✅ Create a new Reading passage
  async createReadingPassage(examId: string, title: string, text: string) {
    return this.prisma.passage.create({
      data: {
        examId,
        title,
        text,
      },
    });
  }

  // ✅ Create a new Reading question
  async createReadingQuestion(
    passageId: string,
    questionType: QuestionType,
    questionText: string,
    correctAnswer: string,
    options?: string[]
  ) {
    // ✅ Fetch passage to get examId
    const passage = await this.prisma.passage.findUnique({
      where: { id: passageId },
      select: { examId: true },
    });

    if (!passage) {
      throw new Error('Passage not found');
    }

    // ✅ Create Reading Question
    return this.prisma.question.create({
      data: {
        examId: passage.examId,
        passageId,
        module: Module.Reading,
        type: questionType, // ✅ Dynamic type
        content: { question: questionText },
        correct_answer: correctAnswer,
        options: questionType === QuestionType.MCQ ? options : undefined, // ✅ Only MCQ gets options
      },
    });
  }
    
}
