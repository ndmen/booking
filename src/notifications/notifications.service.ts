import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class NotificationsService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  async createCronNotification(appointment_id, user, doctor, date) {
    const dates = new Date(date);
    const job = new CronJob(dates, () => {
      this.addMessageToLogFile(appointment_id, user, doctor, date);
    });

    await this.schedulerRegistry.addCronJob(`${Date.now()} - ${user}`, job);
    job.start();

    return 'Notification was added';
  }

  async addMessageToLogFile(appointment_id, user, doctor, data) {}
}
