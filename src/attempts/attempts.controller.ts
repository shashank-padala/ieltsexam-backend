import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { Module } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Attempts') // ✅ Groups endpoints under "Attempts" in Swagger
@Controller('attempts')
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}

  // ✅ Start a New Attempt
  @ApiOperation({ summary: 'Start a new attempt for an exam module' })
  @ApiQuery({ name: 'userId', required: true, type: String, description: 'User UUID' })
  @ApiQuery({ name: 'examId', required: true, type: String, description: 'Exam UUID' })
  @ApiQuery({ name: 'module', required: true, enum: Module, description: 'Module type (Listening, Reading, Writing, Speaking)' })
  @ApiResponse({ status: 201, description: 'Attempt successfully created' })
  @Post()
  async startAttempt(
    @Query('userId') userId: string,
    @Query('examId') examId: string,
    @Query('module') module: Module,
  ) {
    return this.attemptsService.startAttempt(userId, examId, module);
  }

  // ✅ Get All Attempts for a User
  @ApiOperation({ summary: 'Retrieve all attempts for a specific user' })
  @ApiParam({ name: 'userId', required: true, description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'Returns an array of attempts' })
  @Get(':userId')
  async getUserAttempts(@Param('userId') userId: string) {
    return this.attemptsService.getUserAttempts(userId);
  }

  // ✅ Submit an Attempt & Get Score
  @ApiOperation({ summary: 'Submit an attempt and calculate score' })
  @ApiParam({ name: 'attemptId', required: true, description: 'Attempt UUID' })
  @ApiResponse({ status: 200, description: 'Returns the calculated band score and responses' })
  @Put(':attemptId')
  async submitAttempt(
    @Param('attemptId') attemptId: string,
    @Body('responses') responses: any,
  ) {
    return this.attemptsService.submitAttempt(attemptId, responses);
  }
}
