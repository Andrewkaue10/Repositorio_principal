import express from "express";
import livroRouter from "./controllers/livro.controller";
import bodyParser from "body-parser";

export const createApp = () => {
  const app = express();
  app.use(bodyParser.json());

  app.use("/api/livros", livroRouter);

  app.get("/", (_, res) => res.json({ status: "ok", name: "Library API" }));

  return app;
};
