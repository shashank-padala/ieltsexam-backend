import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Module, MediaType } from '@prisma/client';  // ✅ Import Enums

@Injectable()
export class ListeningService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get all Listening questions for an exam
  async getListeningQuestions(examId: string) {
    return this.prisma.question.findMany({
      where: { examId, module: Module.Listening },
    });
  }

  // ✅ Get a single Listening question by ID
  async getListeningQuestionById(questionId: string) {
    return this.prisma.question.findUnique({
      where: { id: questionId },
    });
  }

  // ✅ Create a new Listening question with an optional media asset
  async createListeningQuestion(
    examId: string,
    questionText: string,
    correctAnswer: string,
    options: string[],
    mediaUrl?: string
  ) {
    // ✅ If mediaUrl is provided, create media asset separately
    const mediaAsset = mediaUrl ? await this.createMediaAsset(examId, mediaUrl) : null;

    // ✅ Create the listening question and associate the media asset (if available)
    return this.prisma.question.create({
      data: {
        examId,
        module: Module.Listening,
        type: 'MCQ',
        content: { question: questionText },
        correct_answer: correctAnswer,
        options: options,
        mediaAssetId: mediaAsset ? mediaAsset.id : null, // ✅ Link mediaAsset if it was created
      },
    });
  }

  // ✅ Separate function to create a Media Asset
  private async createMediaAsset(examId: string, mediaUrl: string) {
    return this.prisma.mediaAsset.create({
      data: {
        examId: examId,
        module: Module.Listening, // ✅ Use Enum
        type: MediaType.Audio,    // ✅ Use Enum
        url: mediaUrl,
      },
    });
  }

  // ✅ Get all Listening media assets (Audio, Images)
  async getListeningMediaAssets(examId: string) {
    return this.prisma.mediaAsset.findMany({
      where: { examId, module: Module.Listening },
    });
  }
}
