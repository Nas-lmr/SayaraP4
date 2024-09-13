import { Index, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  name: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  adresse: string;

  @Index({ spatial: true })
  @Column({ type: "geometry", spatialFeatureType: "Point", srid: 4326 })
  coordinate: string;
}
