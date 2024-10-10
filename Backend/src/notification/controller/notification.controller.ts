import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Sse,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Observable, filter, fromEvent, map } from "rxjs";
import { NotificationEntity } from "../entity/notification.entity";
import { NotificationService } from "../service/notification.service";

interface MessageEvent {
  data: string | object;
}

@Controller("notifications")
export class NotificationController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly notificationService: NotificationService
  ) {}

  @Sse("sse/:ownerId")
  async sse(
    @Param("ownerId") ownerId: string
  ): Promise<Observable<MessageEvent>> {
    if (!ownerId) {
      throw new BadRequestException("ownerId must be a valid number");
    }
    const ownerIdNum = parseInt(ownerId, 10);

    // Mark notifications as seen when connecting
    return fromEvent(this.eventEmitter, "notification.event").pipe(
      filter((event: any) => event.ownerId === ownerIdNum),
      map((event: any) => ({ data: event }))
    );
  }

  @Get(":ownerId")
  async getAllNotifications(
    @Param("ownerId") ownerId: number
  ): Promise<NotificationEntity[]> {
    return this.notificationService.getAllNotificationsByOwnerId(ownerId);
  }

  @Post("seen")
  async markNotificationAsSeen(
    @Body() body: { ownerId: number; notificationId: number }
  ): Promise<void> {
    const { ownerId, notificationId } = body;

    if (
      !ownerId ||
      isNaN(ownerId) ||
      !notificationId ||
      isNaN(notificationId)
    ) {
      throw new BadRequestException(
        "Both ownerId and notificationId must be valid numbers"
      );
    }

    await this.notificationService.markNotificationsAsSeen(
      ownerId,
      notificationId
    );
  }
}


