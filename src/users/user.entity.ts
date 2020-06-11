import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booklist } from 'src/booklists/booklist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  pass: string;

  @Column()
  role: string;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Booklist,
    booklist => booklist.user,
  )
  booklists: Booklist[];
}
