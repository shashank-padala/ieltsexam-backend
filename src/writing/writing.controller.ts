import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { WritingService } from './writing.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Writing') // ✅ Groups endpoints under "Writing" in Swagger
@Controller('writing')
export class WritingController {
  constructor(private writingService: WritingService) {}

  // ✅ Get All Writing Tasks for an Exam
  @ApiOperation({ summary: 'Retrieve all writing tasks for an exam' })
  @ApiParam({ name: 'examId', required: true, description: 'Exam UUID' })
  @ApiResponse({ status: 200, description: 'Returns an array of writing tasks' })
  @Get('/exam/:examId')
  async getWritingTasks(@Param('examId') examId: string) {
    return this.writingService.getWritingTasks(examId);
  }

  // ✅ Get a Single Writing Task
  @ApiOperation({ summary: 'Retrieve a single writing task by ID' })
  @ApiParam({ name: 'taskId', required: true, description: 'Writing task UUID' })
  @ApiResponse({ status: 200, description: 'Returns the requested writing task' })
  @Get('/task/:taskId')
  async getWritingTaskById(@Param('taskId') taskId: string) {
    return this.writingService.getWritingTaskById(taskId);
  }

  // ✅ Create a New Writing Task
  @ApiOperation({ summary: 'Create a new writing task' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        examId: { type: 'string', description: 'Exam UUID' },
        taskNumber: { type: 'number', description: 'Task number (1 or 2)' },
        question: { type: 'string', description: 'The writing task question' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Writing task successfully created' })
  @Post('/task')
  async createWritingTask(
    @Body('examId') examId: string,
    @Body('taskNumber') taskNumber: number,
    @Body('question') question: string
  ) {
    return this.writingService.createWritingTask(examId, taskNumber, question);
  }
}
