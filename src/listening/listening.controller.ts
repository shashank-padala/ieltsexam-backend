import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ListeningService } from './listening.service';

@Controller('listening')
export class ListeningController {
  constructor(private listeningService: ListeningService) {}

  // ✅ Get all Listening questions for an exam
  @Get('/exam/:examId')
  async getListeningQuestions(@Param('examId') examId: string) {
    return this.listeningService.getListeningQuestions(examId);
  }

  // ✅ Get a single Listening question by ID
  @Get('/question/:questionId')
  async getListeningQuestionById(@Param('questionId') questionId: string) {
    return this.listeningService.getListeningQuestionById(questionId);
  }

  // ✅ Create a new Listening question
  @Post('/question')
  async createListeningQuestion(
    @Body('examId') examId: string,
    @Body('questionText') questionText: string,
    @Body('correctAnswer') correctAnswer: string,
    @Body('options') options: string[],
    @Body('mediaUrl') mediaUrl?: string
  ) {
    return this.listeningService.createListeningQuestion(
      examId,
      questionText,
      correctAnswer,
      options,
      mediaUrl
    );
  }

  // ✅ Get all Listening media assets (Audio, Images)
  @Get('/media/:examId')
  async getListeningMediaAssets(@Param('examId') examId: string) {
    return this.listeningService.getListeningMediaAssets(examId);
  }
}
