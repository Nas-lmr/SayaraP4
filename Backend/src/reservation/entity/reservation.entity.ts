import { TripEntity } from "src/trip/entity/trip.entity";
import { UserEntity } from "src/user/entity/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { ReservationStatusEntity } from "./reservation_status.entity";

@Entity()
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReservationStatusEntity, { nullable: false })
  @JoinColumn({ name: "reservation_status_id" })
  reservationStatus: ReservationStatusEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: "passenger_id" })
  passengerId: UserEntity;

  @ManyToOne(() => TripEntity, { nullable: false })
  @JoinColumn({ name: "trip_id" })
  tripId: TripEntity;

  @Column({ type: "int", nullable: false })
  seatsReserved: number;

  @Column({ type: String, nullable: true })
  paymentIntentId: String;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  reservationTime: Date;

  @BeforeInsert()
  setDefaultReservationStatus() {
    if (!this.reservationStatus) {
      const defaultStatus = new ReservationStatusEntity();
      defaultStatus.id = 1;
      this.reservationStatus = defaultStatus;
    }
  }
}
