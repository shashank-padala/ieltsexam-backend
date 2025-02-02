import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamType } from '@prisma/client';

@Controller('exams')
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  // ✅ Get all exams
  @Get()
  async getAllExams() {
    return this.examsService.getAllExams();
  }

  // ✅ Get exam by ID
  @Get(':id')
  async getExamById(@Param('id') id: string) {
    return this.examsService.getExamById(id);
  }

  // ✅ Create a new exam
  @Post()
  async createExam(
    @Query('year') year: number,
    @Query('month') month: number,
    @Query('type') type: ExamType,
  ) {
    return this.examsService.createExam(Number(year), Number(month), type);
  }

  // ✅ Delete an exam by ID
  @Delete(':id')
  async deleteExam(@Param('id') id: string) {
    return this.examsService.deleteExam(id);
  }
}
