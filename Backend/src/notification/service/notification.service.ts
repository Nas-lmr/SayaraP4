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
      tripId: trip,
      reservationId: reservation,
    });

    const savedNotification =
      await this.notificationRepository.save(notification);

    const notificationId = savedNotification.id;

    // Emit the notification event through EventEmitter2  for the sse 
    this.eventEmitter.emit("notification.event", {
      message: notificationContent.message,
      ownerId: tripOwnerId,
      notificationId,
    });
  }
  async markNotificationsAsSeen(
    ownerId: number,
    notificationId: number
  ): Promise<void> {
    await this.notificationRepository.update(
      { id: notificationId, owner: { id: ownerId }, seen: false },
      { seen: true }
    );
  }

  // Fetch missed notifications 
  async getMissedNotificationsByOwnerId(
    ownerId: number
  ): Promise<NotificationEntity[]> {
    return await this.notificationRepository
      .createQueryBuilder("notification")
      .leftJoinAndSelect("notification.tripId", "trip")
      .leftJoinAndSelect("trip.departureCity", "departureCity")
      .leftJoinAndSelect("trip.destinationCity", "destinationCity")
      .leftJoinAndSelect("notification.reservationId", "reservation")
      .leftJoinAndSelect("notification.type", "notificationType")
      .leftJoinAndSelect("notification.owner","ownerID")
      .leftJoinAndSelect("notification.user","passenger")
      .where("notification.owner = :ownerId", { ownerId })
      .andWhere("notification.seen = :seen", { seen: false })
      .select([
        "notification.id",
        "notification.content",
        "notification.seen",
        "ownerID.id",
        "passenger",
        "trip.id",
        "trip.departureDateTime",
        "departureCity.name",
        "destinationCity.name",
        "reservation",
        "notificationType.name",
      ])
      .orderBy("notification.id", "DESC")
      .getMany();
  }

  // Fetch all notifications
  async getAllNotificationsByOwnerId(
    ownerId: number
  ): Promise<NotificationEntity[]> {
    const missedNotifications =
      await this.getMissedNotificationsByOwnerId(ownerId);

    const seenNotifications = await this.notificationRepository
      .createQueryBuilder("notification")
      .leftJoinAndSelect("notification.tripId", "trip")
      .leftJoinAndSelect("trip.departureCity", "departureCity")
      .leftJoinAndSelect("trip.destinationCity", "destinationCity")
      .leftJoinAndSelect("notification.reservationId", "reservation")
      .leftJoinAndSelect("notification.type", "notificationType")
      .leftJoinAndSelect("notification.owner", "ownerID")
      .leftJoinAndSelect("notification.user","passenger")
      .where("notification.owner = :ownerId", { ownerId })
      .andWhere("notification.seen = :seen", { seen: true })
      .select([
        "notification.id",
        "notification.content",
        "notification.seen",
        "ownerID.id",
        "passenger",
        "trip.id",
        "departureCity.name",
        "destinationCity.name",
        "trip.departureDateTime",
        "reservation",
        "notificationType.name",
      ])
      .orderBy("notification.id", "DESC")
      .getMany();

    return [...missedNotifications, ...seenNotifications];
  }
}
