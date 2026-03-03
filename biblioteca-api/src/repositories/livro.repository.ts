import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Livro } from "../entities/livro.entity";

export class LivroRepository {
  private repo: Repository<Livro>;

  constructor() {
    this.repo = AppDataSource.getRepository(Livro);
  }

  async create(livro: Partial<Livro>): Promise<Livro> {
    const entity = this.repo.create(livro);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Livro[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Livro | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, dados: Partial<Livro>): Promise<Livro | null> {
    const livro = await this.repo.findOneBy({ id });
    if (!livro) return null;
    Object.assign(livro, dados);
    return this.repo.save(livro);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }

  async findByISBN(isbn: string): Promise<Livro | null> {
    return this.repo.findOneBy({ isbn });
  }
}
