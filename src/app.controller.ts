import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getRoot(): string {
    return '🚀 IELTS Exam API is running!';
  }

  @Get('/health')
  getHealth(): { status: string } {
    return { status: 'OK' };
  }

  @Get('/version')
  getVersion(): { version: string } {
    return { version: '0.1.0' }; // Update version as needed
  }
}
