import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';

import { ConfigModule } from '@nestjs/config';

import { BatchService } from './batch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [ConfigModule.forRoot(), DatabaseModule, ScheduleModule.forRoot()],
	controllers: [BatchController],
	providers: [BatchService],
})
export class BatchModule {}
