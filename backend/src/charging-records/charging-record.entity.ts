import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ChargingRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  readingBefore!: number;

  @Column('float')
  readingAfter!: number;

  @Column('float')
  totalCharged!: number;

  @Column('float')
  price!: number;

  @Column()
  date!: Date;
}
