import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async createExam(dto: CreateExamDto) {
    return this.prisma.exam.create({
      data: {
        type: dto.type,
        year: dto.year,
        month: dto.month,
        modules: {
          create: dto.modules.map(module => ({ module }))
        },
        questions: {
          createMany: {
            data: dto.questions
          }
        }
      },
      include: {
        modules: true,
        questions: true
      }
    });
  }

  async getExamById(id: string) {
    return this.prisma.exam.findUnique({
      where: { id },
      include: {
        modules: true,
        questions: true,
        attempts: true
      }
    });
  }
}