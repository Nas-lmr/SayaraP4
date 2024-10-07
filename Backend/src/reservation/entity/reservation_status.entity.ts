import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReservationStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
