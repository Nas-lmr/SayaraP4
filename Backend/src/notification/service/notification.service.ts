import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { ReservationEntity } from "src/reservation/entity/reservation.entity";
import { TripEntity } from "src/trip/entity/trip.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Repository } from "typeorm";
import { NotificationEntity } from "../entity/notification.entity";
import { NotificationTypeEntity } from "../entity/notificatioType.entity";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(NotificationTypeEntity)
    private readonly notificationTypeRepository: Repository<NotificationTypeEntity>,
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async notifyTripOwner(reservation: ReservationEntity) {
    const trip = await this.tripRepository.findOne({
      where: { id: reservation.tripId.id },
      relations: ["owner"],
    });

    if (!trip) {
      throw new NotFoundException("Trip not found");
    }

    const passenger = await this.userRepository.findOne({
      where: { id: reservation.passengerId.id },
    });

    if (!passenger) {
      throw new NotFoundException("Passenger not found");
    }

    const tripOwnerId = trip.owner.id;
    const notificationContent = {
      message: `Demande de réservation de ${passenger.username} à ${new Date().toLocaleTimeString()}`,
      tripId: trip.id,
      passengerId: passenger.id,
      ownerId: tripOwnerId,
      reservationId: reservation.id,
    };

    const notificationType = await this.notificationTypeRepository.findOne({
      where: { name: "Reservation" },
    });

    if (!notificationType) {
      throw new NotFoundException("Notification type not found");
    }

    const notification = this.notificationRepository.create({
      content: notificationContent.message,
      user: reservation.passengerId,
      owner: trip.owner,
      type: notificationType,
    });

    const savedNotification =
      await this.notificationRepository.save(notification);
    const notificationId = savedNotification.id;
    // Emit the notification event through EventEmitter2
    this.eventEmitter.emit("notification.event", {
      message: notificationContent.message,
      ownerId: tripOwnerId,
      notificationId,
    });
  }
  //fonction post pour màj notification comme lu
  async markNotificationsAsSeen(
    ownerId: number,
    notificationId: number
  ): Promise<void> {
    await this.notificationRepository.update(
      { id: notificationId, owner: { id: ownerId }, seen: false },
      { seen: true }
    );
  }

  // Fetch missed notif
  async getMissedNotificationsByOwnerId(
    ownerId: number
  ): Promise<NotificationEntity[]> {
    return this.notificationRepository.find({
      where: { owner: { id: ownerId }, seen: false },
      relations: ["user", "owner"],
      order: { id: "DESC" },
    });
  }

  // Fetch all notif prioritizing missed notifications
  async getAllNotificationsByOwnerId(
    ownerId: number
  ): Promise<NotificationEntity[]> {
    const missedNotifications =
      await this.getMissedNotificationsByOwnerId(ownerId);

    const seenNotifications = await this.notificationRepository.find({
      where: { owner: { id: ownerId }, seen: true },
      relations: ["user", "owner"],
      order: { id: "DESC" },
    });

    return [...missedNotifications, ...seenNotifications];
  }
}
