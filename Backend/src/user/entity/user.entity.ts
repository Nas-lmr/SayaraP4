import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar',length: 100 })
  username: string;

  @Column({type:'varchar', length: 100 })
  email: string;

  @Column({ type:'varchar',length:255  })
  password: string;

  @Column({ type:'text' })
  description: string;
}
