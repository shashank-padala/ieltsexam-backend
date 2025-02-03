import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App') // ✅ Groups endpoints under "App" in Swagger
@Controller()
export class AppController {
  // ✅ Root Endpoint
  @ApiOperation({ summary: 'Root endpoint, typically unused' })
  @ApiResponse({ status: 200, description: 'Returns a basic welcome message' })
  @Get('/')
  getRoot(): string {
    return 'Welcome to the IELTS Exam Practice API!';
  }

  // ✅ Health Check Endpoint
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Returns API health status' })
  @Get('/health')
  getHealth(): object {
    return { status: 'ok' };
  }

  // ✅ Version Endpoint
  @ApiOperation({ summary: 'Get API version' })
  @ApiResponse({ status: 200, description: 'Returns the current API version' })
  @Get('/version')
  getVersion(): object {
    return { version: '1.0.0' };
  }
}
