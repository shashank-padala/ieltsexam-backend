import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReadingService {
  constructor(private prisma: PrismaService) {}

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
    questionText: string,
    correctAnswer: string,
    options: string[]
  ) {
    // ✅ Fetch the passage to get the associated `examId`
    const passage = await this.prisma.passage.findUnique({
      where: { id: passageId },
      select: { examId: true }, // ✅ Ensure we get the examId
    });
  
    if (!passage) {
      throw new Error('Passage not found');
    }
  
    return this.prisma.question.create({
      data: {
        examId: passage.examId, // ✅ Ensure `examId` is included
        passageId,
        module: 'Reading',
        type: 'MCQ', // ✅ Assume multiple-choice for now
        content: { question: questionText },
        correct_answer: correctAnswer,
        options: options,
      },
    });
  }
    
}
