import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Book } from 'src/books/book.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Book,
    book => book.genres,
  )
  books: Book[];
}
