import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { CityEntity } from "src/city/entity/city.entity";

@Entity()
export class TripEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "owner_id" })
  owner: UserEntity;

  @ManyToOne(() => CityEntity)
  @JoinColumn({ name: "departure_city_id" })
  departureCity: CityEntity;

  @ManyToOne(() => CityEntity)
  @JoinColumn({ name: "destination_city_id" })
  destinationCity: CityEntity;

  @Column({ type: "int", nullable: false })
  availableSeats: number;

  @Column({ type: "int", nullable: false })
  pricePerSeat: number;

  @Column({ type: "timestamp", nullable: false })
  departureTime: Date;
}
