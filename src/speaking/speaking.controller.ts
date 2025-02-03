import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { SpeakingService } from './speaking.service';
import { SpeakingPart } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Speaking') // ✅ Groups endpoints under "Speaking" in Swagger
@Controller('speaking')
export class SpeakingController {
  constructor(private speakingService: SpeakingService) {}

  // ✅ Get All Speaking Questions for an Exam
  @ApiOperation({ summary: 'Retrieve all speaking questions for an exam' })
  @ApiParam({ name: 'examId', required: true, description: 'Exam UUID' })
  @ApiResponse({ status: 200, description: 'Returns an array of speaking questions' })
  @Get('/exam/:examId')
  async getSpeakingQuestions(@Param('examId') examId: string) {
    return this.speakingService.getSpeakingQuestions(examId);
  }

  // ✅ Get a Single Speaking Question
  @ApiOperation({ summary: 'Retrieve a single speaking question by ID' })
  @ApiParam({ name: 'questionId', required: true, description: 'Speaking question UUID' })
  @ApiResponse({ status: 200, description: 'Returns the requested speaking question' })
  @Get('/question/:questionId')
  async getSpeakingQuestionById(@Param('questionId') questionId: string) {
    return this.speakingService.getSpeakingQuestionById(questionId);
  }

  // ✅ Create a New Speaking Question
  @ApiOperation({ summary: 'Create a new speaking question' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        examId: { type: 'string', description: 'Exam UUID' },
        part: { type: 'string', enum: Object.values(SpeakingPart), description: 'Speaking part (Part1, Part2, Part3)' },
        questionText: { type: 'string', description: 'The speaking question text' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Speaking question successfully created' })
  @Post('/question')
  async createSpeakingQuestion(
    @Body('examId') examId: string,
    @Body('part') part: SpeakingPart,
    @Body('questionText') questionText: string
  ) {
    return this.speakingService.createSpeakingQuestion(examId, part, questionText);
  }

  // ✅ Evaluate a Speaking Attempt (Placeholder for Future AI-Based Evaluation)
  @ApiOperation({ summary: 'Evaluate a speaking attempt (AI-based evaluation will be implemented later)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        attemptId: { type: 'string', description: 'Attempt UUID' },
        audioFileUrl: { type: 'string', description: 'URL of the user’s recorded speaking response' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Returns a placeholder response for speaking evaluation' })
  @Post('/evaluate')
  async evaluateSpeakingAttempt(
    @Body('attemptId') attemptId: string,
    @Body('audioFileUrl') audioFileUrl: string
  ) {
    return this.speakingService.evaluateSpeakingAttempt(attemptId, audioFileUrl);
  }
}
