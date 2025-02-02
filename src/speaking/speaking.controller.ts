import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { SpeakingService } from './speaking.service';
import { SpeakingPart } from '@prisma/client'; 

@Controller('speaking')
export class SpeakingController {
  constructor(private speakingService: SpeakingService) {}

  // ✅ Get all Speaking questions for an exam
  @Get('/exam/:examId')
  async getSpeakingQuestions(@Param('examId') examId: string) {
    return this.speakingService.getSpeakingQuestions(examId);
  }

  // ✅ Get a single Speaking question by ID
  @Get('/question/:questionId')
  async getSpeakingQuestionById(@Param('questionId') questionId: string) {
    return this.speakingService.getSpeakingQuestionById(questionId);
  }

  // ✅ Create a new Speaking question
  @Post('/question')
  async createSpeakingQuestion(
    @Body('examId') examId: string,
    @Body('part') part: SpeakingPart,
    @Body('questionText') questionText: string
  ) {
    return this.speakingService.createSpeakingQuestion(examId, part, questionText);
  }

  // ✅ Placeholder for AI-based Speaking evaluation (To be implemented later)
  @Post('/evaluate')
  async evaluateSpeakingAttempt(
    @Body('attemptId') attemptId: string,
    @Body('audioFileUrl') audioFileUrl: string
  ) {
    return this.speakingService.evaluateSpeakingAttempt(attemptId, audioFileUrl);
  }
}
