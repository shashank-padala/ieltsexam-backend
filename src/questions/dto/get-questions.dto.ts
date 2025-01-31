import { IsEnum, IsString } from 'class-validator';
import { Module } from '@prisma/client';

export class GetQuestionsDto {
  @IsString()
  examId: string;

  @IsEnum(Module)
  module: Module;
}