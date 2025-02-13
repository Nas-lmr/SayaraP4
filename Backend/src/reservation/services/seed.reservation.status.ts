import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReservationStatusEntity } from "../entity/reservation_status.entity";

@Injectable()
export class SeedNotificationService implements OnModuleInit {
  constructor(
    @InjectRepository(ReservationStatusEntity)
    private readonly notificationRepository: Repository<ReservationStatusEntity>,
  ) {}

  async onModuleInit() {
    await this.seedNotifications();
  }

  private async seedNotifications() {
    const types = [
      { id: 1, name: "en attente" },
      { id: 2, name: "Refusé" },
      { id: 3, name: "Accepté" },
      { id: 4, name: "Annulé" },
    ];

    for (const type of types) {
      const existingType = await this.notificationRepository.findOne({
        where: { id: type.id },
      });
      if (!existingType) {
        await this.notificationRepository.save(this.notificationRepository.create(type));
      }
    }

  }
}
