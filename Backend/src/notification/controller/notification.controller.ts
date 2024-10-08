import { Controller, Sse, Param, Get, BadRequestException, Body, Post } from '@nestjs/common';
import { Observable, fromEvent, map, filter } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationService } from '../service/notification.service';
import { NotificationEntity } from '../entity/notification.entity';

interface MessageEvent {
  data: string | object;
}

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly notificationService: NotificationService,
  ) {}

  @Sse('sse/:ownerId') 
  async sse(@Param('ownerId') ownerId: string): Promise<Observable<MessageEvent>> {
    if (!ownerId || isNaN(+ownerId)) {
      throw new BadRequestException('ownerId must be a valid number');
    }
    const ownerIdNum = parseInt(ownerId, 10);
    
    // Mark notifications as seen when connecting
    return fromEvent(this.eventEmitter, 'notification.event').pipe(
      filter((event: any) => event.ownerId === ownerIdNum), 
      map((event: any) => ({ data: event })),
    );
  }

  @Get(':ownerId') 
  async getAllNotifications(@Param('ownerId') ownerId: number): Promise<NotificationEntity[]> {
    return this.notificationService.getAllNotificationsByOwnerId(ownerId);
  }



  @Post('seen')
  async markNotificationAsSeen(@Body() body: { ownerId: number, notificationId: number }): Promise<void> {
    const { ownerId, notificationId } = body;

    if (!ownerId || isNaN(ownerId) || !notificationId || isNaN(notificationId)) {
      throw new BadRequestException('Both ownerId and notificationId must be valid numbers');
    }

    await this.notificationService.markNotificationsAsSeen(ownerId, notificationId);
  }
}
