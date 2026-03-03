import "reflect-metadata";
import { DataSource } from "typeorm";
import { Livro } from "./entities/livro.entity";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DB_PATH || "database.sqlite",
  synchronize: true, 
  logging: false,
  entities: [Livro],
  subscribers: [],
  migrations: []
});
