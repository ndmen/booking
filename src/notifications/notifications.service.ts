import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  createNotification(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }
}
