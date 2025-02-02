import { Module } from '@nestjs/common';
import { ListeningService } from './listening.service';
import { ListeningController } from './listening.controller';

@Module({
  providers: [ListeningService],
  controllers: [ListeningController]
})
export class ListeningModule {}
