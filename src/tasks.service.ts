import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // @Interval('notifications', 2500)
    // handleCron() {
    //     this.logger.debug('Called when the current second is 45');
    // }
}