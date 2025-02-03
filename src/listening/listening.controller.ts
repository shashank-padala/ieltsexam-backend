import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ListeningService } from './listening.service';
import { QuestionType } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Listening') // ✅ Groups endpoints under "Listening" in Swagger
@Controller('listening')
export class ListeningController {
  constructor(private listeningService: ListeningService) {}

  // ✅ Get All Listening Questions for an Exam
  @ApiOperation({ summary: 'Retrieve all listening questions for an exam' })
  @ApiParam({ name: 'examId', required: true, description: 'Exam UUID' })
  @ApiResponse({ status: 200, description: 'Returns an array of listening questions' })
  @Get('/exam/:examId')
  async getListeningQuestions(@Param('examId') examId: string) {
    return this.listeningService.getListeningQuestions(examId);
  }

  // ✅ Get a Single Listening Question
  @ApiOperation({ summary: 'Retrieve a single listening question by ID' })
  @ApiParam({ name: 'questionId', required: true, description: 'Question UUID' })
  @ApiResponse({ status: 200, description: 'Returns the requested listening question' })
  @Get('/question/:questionId')
  async getListeningQuestionById(@Param('questionId') questionId: string) {
    return this.listeningService.getListeningQuestionById(questionId);
  }

  // ✅ Create a New Listening Question
  @ApiOperation({ summary: 'Create a new listening question' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        examId: { type: 'string', description: 'Exam UUID' },
        questionType: { type: 'string', enum: Object.values(QuestionType), description: 'Type of question (MCQ, TFNG, etc.)' },
        questionText: { type: 'string', description: 'The actual question text' },
        correctAnswer: { type: 'string', description: 'The correct answer' },
        options: { type: 'array', items: { type: 'string' }, description: 'Options for MCQ questions (optional)' },
        mediaUrl: { type: 'string', description: 'URL for audio or image file (optional)' }
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Listening question successfully created' })
  @Post('/question')
  async createListeningQuestion(
    @Body('examId') examId: string,
    @Body('questionType') questionType: QuestionType,
    @Body('questionText') questionText: string,
    @Body('correctAnswer') correctAnswer: string,
    @Body('options') options?: string[],
    @Body('mediaUrl') mediaUrl?: string
  ) {
    return this.listeningService.createListeningQuestion(
      examId,
      questionType,
      questionText,
      correctAnswer,
      options??[],
      mediaUrl
    );
  }

  // ✅ Get All Listening Media Assets
  @ApiOperation({ summary: 'Retrieve all listening media assets (Audio, Images) for an exam' })
  @ApiParam({ name: 'examId', required: true, description: 'Exam UUID' })
  @ApiResponse({ status: 200, description: 'Returns an array of media assets' })
  @Get('/media/:examId')
  async getListeningMediaAssets(@Param('examId') examId: string) {
    return this.listeningService.getListeningMediaAssets(examId);
  }
}
