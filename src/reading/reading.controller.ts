import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ReadingService } from './reading.service';

@Controller('reading')
export class ReadingController {
  constructor(private readingService: ReadingService) {}

  // ✅ Get all Reading passages for an exam
  @Get('/exam/:examId')
  async getReadingPassages(@Param('examId') examId: string) {
    return this.readingService.getReadingPassages(examId);
  }

  // ✅ Get a single Reading passage with questions
  @Get('/passage/:passageId')
  async getReadingPassageById(@Param('passageId') passageId: string) {
    return this.readingService.getReadingPassageById(passageId);
  }

  // ✅ Create a new Reading passage
  @Post('/passage')
  async createReadingPassage(
    @Body('examId') examId: string,
    @Body('title') title: string,
    @Body('text') text: string
  ) {
    return this.readingService.createReadingPassage(examId, title, text);
  }

  // ✅ Create a new Reading question
  @Post('/question')
  async createReadingQuestion(
    @Body('passageId') passageId: string,
    @Body('questionText') questionText: string,
    @Body('correctAnswer') correctAnswer: string,
    @Body('options') options: string[]
  ) {
    return this.readingService.createReadingQuestion(passageId, questionText, correctAnswer, options);
  }
}
