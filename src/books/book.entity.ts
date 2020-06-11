import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  AfterLoad,
} from 'typeorm';
import { Publisher } from 'src/publishers/publisher.entity';
import { Author } from 'src/authors/author.entity';
import { Genre } from 'src/genres/genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column()
  publishedAt: number;

  @Column({ unique: true })
  isbn: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  pages: number;

  @Column({ nullable: true })
  edition: number;

  @Column({ nullable: true })
  lang: string;

  @Column({ nullable: true })
  cover: string;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Publisher,
    publisher => publisher.books,
    { eager: true },
  )
  publisher: Publisher;

  @ManyToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Author,
    author => author.books,
    { eager: true },
  )
  @JoinTable()
  authors: Author[];

  @ManyToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Genre,
    genre => genre.books,
    { eager: true },
  )
  @JoinTable()
  genres: Genre[];

  @AfterLoad()
  updateCounters() {
    if (this.cover) {
      this.cover = `${process.env.URL_SERVER}/books/cover/${this.cover}`;
    }
  }
}
