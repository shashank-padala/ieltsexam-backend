import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { WritingService } from './writing.service';

@Controller('writing')
export class WritingController {
  constructor(private writingService: WritingService) {}

  // ✅ Get all Writing tasks for an exam
  @Get('/exam/:examId')
  async getWritingTasks(@Param('examId') examId: string) {
    return this.writingService.getWritingTasks(examId);
  }

  // ✅ Get a single Writing task by ID
  @Get('/task/:taskId')
  async getWritingTaskById(@Param('taskId') taskId: string) {
    return this.writingService.getWritingTaskById(taskId);
  }

  // ✅ Create a new Writing task
  @Post('/task')
  async createWritingTask(
    @Body('examId') examId: string,
    @Body('taskNumber') taskNumber: number,
    @Body('question') question: string
  ) {
    return this.writingService.createWritingTask(examId, taskNumber, question);
  }
}
