import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()

export class NotificationTypeEntity {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;
}
