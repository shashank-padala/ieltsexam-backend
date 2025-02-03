import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamType } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Exams') // ✅ Groups endpoints under "Exams" in Swagger
@Controller('exams')
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  // ✅ Get All Exams
  @ApiOperation({ summary: 'Retrieve all exams' })
  @ApiResponse({ status: 200, description: 'Returns an array of exams' })
  @Get()
  async getAllExams() {
    return this.examsService.getAllExams();
  }

  // ✅ Get Exam by ID
  @ApiOperation({ summary: 'Retrieve an exam by ID' })
  @ApiParam({ name: 'id', required: true, description: 'UUID of the exam' })
  @ApiResponse({ status: 200, description: 'Returns an exam object' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @Get(':id')
  async getExamById(@Param('id') id: string) {
    return this.examsService.getExamById(id);
  }

  // ✅ Create a New Exam
  @ApiOperation({ summary: 'Create a new exam' })
  @ApiQuery({ name: 'year', required: true, type: Number, description: 'Exam year (e.g., 2024)' })
  @ApiQuery({ name: 'month', required: true, type: Number, description: 'Exam month (1-12)' })
  @ApiQuery({ name: 'type', required: true, enum: ExamType, description: 'Exam type (Academic/General)' })
  @ApiResponse({ status: 201, description: 'Exam successfully created' })
  @Post()
  async createExam(
    @Query('year') year: number,
    @Query('month') month: number,
    @Query('type') type: ExamType,
  ) {
    return this.examsService.createExam(Number(year), Number(month), type);
  }

  // ✅ Delete an Exam
  @ApiOperation({ summary: 'Delete an exam by ID' })
  @ApiParam({ name: 'id', required: true, description: 'UUID of the exam to delete' })
  @ApiResponse({ status: 200, description: 'Exam successfully deleted' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @Delete(':id')
  async deleteExam(@Param('id') id: string) {
    return this.examsService.deleteExam(id);
  }
}
