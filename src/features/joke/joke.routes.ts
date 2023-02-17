import { Router, Request, Response } from "express";
import { JokeController } from "./joke.controller";

const jokesRoutes = Router();
const jokesController = new JokeController();

jokesRoutes.get("/all", jokesController.getAll);
jokesRoutes.get("/id/:id", jokesController.getById);
jokesRoutes.get("/random/", jokesController.getRandom);
jokesRoutes.get("/type", jokesController.getByType);
jokesRoutes.get("/populate", jokesController.populate);

export default jokesRoutes;
