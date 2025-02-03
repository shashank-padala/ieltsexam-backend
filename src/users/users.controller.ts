import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Users') // ✅ Groups endpoints under "Users" in Swagger
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ✅ Get All Users
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'Returns an array of users' })
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  // ✅ Get a Single User by ID
  @ApiOperation({ summary: 'Retrieve a single user by ID' })
  @ApiParam({ name: 'userId', required: true, description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'Returns the requested user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  // ✅ Create a New User
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name of the user' },
        email: { type: 'string', description: 'Email address of the user' },
        clerkId: { type: 'string', description: 'Unique Clerk ID for authentication' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('clerkId') clerkId: string
  ) {
    return this.usersService.createUser(name, email, clerkId);
  }

  // ✅ Update User Information
  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({ name: 'userId', required: true, description: 'User UUID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Updated name of the user (optional)' },
        email: { type: 'string', description: 'Updated email of the user (optional)' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User information successfully updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body('name') name?: string,
    @Body('email') email?: string
  ) {
    return this.usersService.updateUser(userId, name, email);
  }

  // ✅ Delete a User
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'userId', required: true, description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
