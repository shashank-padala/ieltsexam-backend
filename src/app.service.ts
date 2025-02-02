import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getConfig(): string {
    return 'Global Config Placeholder';
  }

  log(message: string): void {
    console.log(`[Global Log] ${message}`);
  }
}
