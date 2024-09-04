import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() 
export class CityEntity {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ type: 'varchar', length: 50,unique: true }) 
  name: string;

  @Column({ type: 'varchar', length: 150 }) 
  adresse: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) 
  longitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) 
  latitude: number;
}
