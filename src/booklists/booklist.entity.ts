import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  Unique,
} from 'typeorm';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';

@Entity()
@Unique(['name', 'userId'])
export class Booklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => User,
    user => user.booklists,
  )
  user: User;

  @Column()
  userId: number;

  @ManyToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Book,
  )
  @JoinTable()
  books: Book[];
}
