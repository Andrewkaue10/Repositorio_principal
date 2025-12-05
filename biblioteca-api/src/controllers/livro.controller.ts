import { Request, Response, Router } from "express";
import { LivroRepository } from "../repositories/livro.repository";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateLivroDto, UpdateLivroDto } from "../dtos/livro.dto";

const router = Router();
const repo = new LivroRepository();

/**
 * POST /api/livros
 */
router.post("/", async (req: Request, res: Response) => {
  const dto = plainToInstance(CreateLivroDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json({ errors });

  const existing = await repo.findByISBN(dto.isbn);
  if (existing) return res.status(409).json({ message: "ISBN já cadastrado" });

  const created = await repo.create(dto as any);
  return res.status(201).json(created);
});

/**
 * GET /api/livros
 */
router.get("/", async (_req, res) => {
  const list = await repo.findAll();
  return res.json(list);
});

/**
 * GET /api/livros/:id
 */
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });
  const livro = await repo.findById(id);
  if (!livro) return res.status(404).json({ message: "Livro não encontrado" });
  return res.json(livro);
});

/**
 * PUT /api/livros/:id
 */
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  const dto = plainToInstance(CreateLivroDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json({ errors });

  // Verifica conflito de ISBN (se trocar para um ISBN já existente)
  if (dto.isbn) {
    const existing = await repo.findByISBN(dto.isbn);
    if (existing && existing.id !== id) return res.status(409).json({ message: "ISBN já cadastrado por outro livro" });
  }

  const updated = await repo.update(id, dto as any);
  if (!updated) return res.status(404).json({ message: "Livro não encontrado" });
  return res.json(updated);
});

/**
 * PATCH /api/livros/:id
 */
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  const dto = plainToInstance(UpdateLivroDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json({ errors });

  if (dto.isbn) {
    const existing = await repo.findByISBN(dto.isbn);
    if (existing && existing.id !== id) return res.status(409).json({ message: "ISBN já cadastrado por outro livro" });
  }

  const updated = await repo.update(id, dto as any);
  if (!updated) return res.status(404).json({ message: "Livro não encontrado" });
  return res.json(updated);
});

/**
 * DELETE /api/livros/:id
 */
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

  const ok = await repo.delete(id);
  if (!ok) return res.status(404).json({ message: "Livro não encontrado" });
  return res.status(204).send();
});

export default router;
