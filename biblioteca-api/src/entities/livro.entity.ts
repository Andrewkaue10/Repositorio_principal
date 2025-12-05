import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "livros" })
export class Livro {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "text" })
  titulo!: string;

  @Column({ type: "text" })
  autor!: string;

  @Column({ type: "text", unique: true })
  isbn!: string;

  @Column({ type: "integer", nullable: true })
  anoPublicacao?: number;

  @Column({ type: "boolean", default: true })
  disponivel!: boolean;
}
