import { CityEntity } from "src/city/entity/city.entity";
import { UserEntity } from "src/user/entity/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class TripEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { nullable: false })  
  @JoinColumn({ name: "owner_id" })
  owner: UserEntity;

  @ManyToOne(() => CityEntity, { nullable: false })
  @JoinColumn({ name: "departure_city_id" })
  departureCity: CityEntity;

  @ManyToOne(() => CityEntity, { nullable: false })
  @JoinColumn({ name: "destination_city_id" })
  destinationCity: CityEntity;

  @Column({ type: "int", nullable: false })
  availableSeats: number;

  @Column({ type: "int", nullable: false })
  pricePerSeat: number;

  @Column({ type: "datetime", nullable: false })
  departureDateTime: Date;
}
