import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { QuestionType } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Reading') // ✅ Groups endpoints under "Reading" in Swagger
@Controller('reading')
export class ReadingController {
  constructor(private readingService: ReadingService) {}

  // ✅ Get All Reading Passages for an Exam
  @ApiOperation({ summary: 'Retrieve all reading passages for an exam' })
  @ApiParam({ name: 'examId', required: true, description: 'Exam UUID' })
  @ApiResponse({ status: 200, description: 'Returns an array of reading passages' })
  @Get('/exam/:examId')
  async getReadingPassages(@Param('examId') examId: string) {
    return this.readingService.getReadingPassages(examId);
  }

  // ✅ Get a Single Reading Passage
  @ApiOperation({ summary: 'Retrieve a single reading passage by ID' })
  @ApiParam({ name: 'passageId', required: true, description: 'Passage UUID' })
  @ApiResponse({ status: 200, description: 'Returns the requested reading passage' })
  @Get('/passage/:passageId')
  async getReadingPassageById(@Param('passageId') passageId: string) {
    return this.readingService.getReadingPassageById(passageId);
  }

  // ✅ Create a New Reading Passage
  @ApiOperation({ summary: 'Create a new reading passage' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        examId: { type: 'string', description: 'Exam UUID' },
        title: { type: 'string', description: 'Title of the passage' },
        text: { type: 'string', description: 'Full text of the passage' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Reading passage successfully created' })
  @Post('/passage')
  async createReadingPassage(
    @Body('examId') examId: string,
    @Body('title') title: string,
    @Body('text') text: string
  ) {
    return this.readingService.createReadingPassage(examId, title, text);
  }

  // ✅ Create a New Reading Question
  @ApiOperation({ summary: 'Create a new reading question' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        passageId: { type: 'string', description: 'Passage UUID' },
        questionType: { type: 'string', enum: Object.values(QuestionType), description: 'Type of question (MCQ, TFNG, etc.)' },
        questionText: { type: 'string', description: 'The actual question text' },
        correctAnswer: { type: 'string', description: 'The correct answer' },
        options: { type: 'array', items: { type: 'string' }, description: 'Options for MCQ questions (optional)' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Reading question successfully created' })
  @Post('/question')
  async createReadingQuestion(
    @Body('passageId') passageId: string,
    @Body('questionType') questionType: QuestionType,
    @Body('questionText') questionText: string,
    @Body('correctAnswer') correctAnswer: string,
    @Body('options') options?: string[]
  ) {
    return this.readingService.createReadingQuestion(
      passageId,
      questionType,
      questionText,
      correctAnswer,
      options
    );
  }
}
