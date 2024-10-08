import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { NotificationTypeEntity } from "./notificatioType.entity";
import { UserEntity } from "src/user/entity/user.entity";

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
  
  @Column({ type: "text" })
  content: string;

  @Column({ type: "boolean", default: false }) 
  seen: boolean; 
}
