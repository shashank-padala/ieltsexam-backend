import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { Module } from '@prisma/client';  // ✅ Import Module enum

@Controller('attempts')
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}

  // ✅ Start a new attempt
  @Post()
  async startAttempt(
    @Query('userId') userId: string,
    @Query('examId') examId: string,
    @Query('module') module: string  // ✅ Module is received as a string from query params
  ) {
    // ✅ Convert the string into a `Module` enum to prevent TypeScript errors
    if (!(module in Module)) {
      throw new Error('Invalid module type. Use Listening, Reading, Writing, or Speaking.');
    }
    
    const moduleEnum = module as Module;  
    return this.attemptsService.startAttempt(userId, examId, moduleEnum);
  }

  // ✅ Get all attempts for a specific user
  @Get(':userId')
  async getUserAttempts(@Param('userId') userId: string) {
    return this.attemptsService.getUserAttempts(userId);
  }

  // ✅ Submit an attempt (Listening, Reading, Writing, or Speaking)
  @Put(':attemptId')
  async submitAttempt(
    @Param('attemptId') attemptId: string,
    @Body('responses') responses: any  // ✅ Responses contain user answers for evaluation
  ) {
    return this.attemptsService.submitAttempt(attemptId, responses);
  }
}
