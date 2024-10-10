import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { NotificationTypeEntity } from "./notificatioType.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { TripEntity } from "src/trip/entity/trip.entity";
import { ReservationEntity } from "src/reservation/entity/reservation.entity";

@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NotificationTypeEntity, (type) => type.id, {
    nullable: false,
  })
  @JoinColumn({ name: "type_id" })
  type: NotificationTypeEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (owner) => owner.id, { nullable: false })
  @JoinColumn({ name: "owner_id" })
  owner: UserEntity;

  @ManyToOne(()=>TripEntity,(trip)=> trip.id,{nullable:false})
  @JoinColumn({name:"trip_id"})
  tripId:TripEntity;

  @ManyToOne (()=> ReservationEntity,(r) => r.id,{nullable:false})
  @JoinColumn({name:"reservation_id"})
  reservationId:ReservationEntity;
  
  @Column({ type: "text" })
  content: string;

  @Column({ type: "boolean", default: false }) 
  seen: boolean; 
}
