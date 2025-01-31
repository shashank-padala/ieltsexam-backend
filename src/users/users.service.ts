import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserProfile(clerkId: string) {
    return this.prisma.user.findUnique({
      where: { clerkId },
      include: {
        exams: true,
        attempts: true
      }
    });
  }
}