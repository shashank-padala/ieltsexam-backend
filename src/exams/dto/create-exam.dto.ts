import { Module, ExamType } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateExamDto {
  @IsEnum(ExamType)
  type: ExamType;

  @IsInt()
  year: number;

  @IsInt()
  month: number;

  @IsNotEmpty()
  modules: Module[];

  questions: Array<{
    module: Module;
    content: any;
    answers: any;
  }>;
}