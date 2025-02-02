import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get all users
  async getUsers() {
    return this.prisma.user.findMany();
  }

  // ✅ Get a single user by ID
  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  // ✅ Create a new user
  async createUser(name: string, email: string, clerkId: string) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        clerkId, // ✅ Ensure clerkId is included
      },
    });
  }
  

  // ✅ Update user details
  async updateUser(userId: string, name?: string, email?: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });
  }

  // ✅ Delete a user
  async deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
