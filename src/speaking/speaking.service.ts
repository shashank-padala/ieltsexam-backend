import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Module, SpeakingPart } from '@prisma/client';

@Injectable()
export class SpeakingService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get all Speaking questions for an exam
  async getSpeakingQuestions(examId: string) {
    return this.prisma.speakingQuestion.findMany({
      where: { examId },
    });
  }

  // ✅ Get a single Speaking question by ID
  async getSpeakingQuestionById(questionId: string) {
    return this.prisma.speakingQuestion.findUnique({
      where: { id: questionId },
    });
  }

  // ✅ Create a new Speaking question (Part 1, 2, or 3)
  async createSpeakingQuestion(examId: string, part: SpeakingPart, questionText: string) {
    return this.prisma.speakingQuestion.create({
      data: {
        examId,
        part,
        question: questionText,
      },
    });
  }

  // ✅ Placeholder for future AI-based Speaking evaluation
  async evaluateSpeakingAttempt(attemptId: string, audioFileUrl: string) {
    return {
      message: 'Speaking evaluation with AI will be implemented in the future.',
      attemptId,
      audioFileUrl,
    };
  }
}
