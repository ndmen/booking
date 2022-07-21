import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NotificationsService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  async createCronNotification(appointment_id, user, doctor, date) {
    const date24h = new Date(date);
    date24h.setDate(date24h.getDate() - 1);
    console.log(date24h);
    const date2h = new Date(date);
    date2h.setTime(date2h.getTime() - 1 * 2 * 60 * 60 * 1000);
    console.log(date2h);

    const job2h = new CronJob(date2h, () => {
      this.addMessageToLogFile(appointment_id, user, doctor, date);
    });
    const job24h = new CronJob(date24h, () => {
      this.addMessageToLogFile(appointment_id, user, doctor, date);
    });

    await this.schedulerRegistry.addCronJob(`${Date.now()} - ${user}`, job2h);
    job2h.start();
    console.log('Job will start in ' + date2h);
    await this.schedulerRegistry.addCronJob(`${Date.now()} - ${user}`, job24h);
    job24h.start();
    console.log('Job will start in ' + date24h);

    return 'Notification was added';
  }

  async addMessageToLogFile(appointment_id, user, doctor, date) {
    const data =
      Date.now() +
      ' Hi ' +
      user +
      '! We remind you that you are scheduled for ' +
      doctor +
      ' tomorrow at ' +
      date +
      '\n';
    const writeStream = fs.createWriteStream('notifications.log');
    writeStream.write(data, 'utf-8');
    writeStream.on('finish', () => {
      console.log('Wrote all data to file notifications.log');
    });
    writeStream.end();
  }
}
