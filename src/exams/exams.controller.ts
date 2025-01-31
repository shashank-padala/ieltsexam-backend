import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  create(@Body() dto: CreateExamDto) {
    return this.examsService.createExam(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.getExamById(id);
  }
}