import { TripEntity } from "src/trip/entity/trip.entity";
import { UserEntity } from "src/user/entity/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reservationStatusId: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: "passenger_id" })
  passengerId: UserEntity;

  @ManyToOne(() => TripEntity, { nullable: false })
  @JoinColumn({ name: "trip_id" })
  tripId: TripEntity;

  @Column({ type: "int", nullable: false })
  seatsReserved: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  reservationTime: Date;
}
