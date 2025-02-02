import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ✅ Get all users
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  // ✅ Get user by ID
  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  // ✅ Create a new user
  @Post()
    async createUser(
      @Body('name') name: string,
      @Body('email') email: string,
      @Body('clerkId') clerkId: string
    ) {
      return this.usersService.createUser(name, email, clerkId);
    }

  // ✅ Update user details
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body('name') name?: string,
    @Body('email') email?: string
  ) {
    return this.usersService.updateUser(userId, name, email);
  }

  // ✅ Delete a user
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
