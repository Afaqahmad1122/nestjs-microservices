import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Marks this class as a database table
export class Item {
  @PrimaryGeneratedColumn('uuid') // Auto-generate UUID for ID
  id: string;

  @Column() // Standard column
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
