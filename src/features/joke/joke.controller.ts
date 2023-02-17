import { JokeService } from "./joke.services";
import { Request, Response } from "express";
import { IJoke } from "./joke.types";
import { Schema } from "mongoose";
import { type } from "os";

export class JokeController {
  // Fetch all jokes - paginated
  async getAll(request: Request, response: Response) {
    let page: number = 1;

    const requestPage = request.query.page;

    if (
      requestPage &&
      (typeof requestPage == "string" || typeof request == "number")
    ) {
      page = Number(requestPage);
    }

    const allJokes: Array<IJoke> = await new JokeService().getAll(page);
    response.status(200).json({ jokes: allJokes, page: page });
  }

  // create new joke
  async create(request: Request, response: Response) {
    const joke: IJoke = {
      type: "UNKNOWN",
      setup: "string",
      punchline: "string",
      reactions: [],
    };

    const newJoke = await new JokeService().create(joke);
    response.status(200).json({ joke: newJoke });
  }

  // get joke by id
  async getById(request: Request, response: Response) {
    const jokeId = request.params.id;

    if (!jokeId) {
      response
        .status(404)
        .json({ message: `Joke with id ${jokeId} not found.` });

      return;
    }

    const joke = await new JokeService().getById(jokeId);

    if (!joke) {
      response
        .status(404)
        .json({ message: `Joke with id ${jokeId} not found.` });

      return;
    }
    response.status(200).json({ joke: joke });
  }

  // get random joke
  async getRandom(request: Request, response: Response) {
    const joke = await new JokeService().getRandom();

    response.status(200).json({ joke: joke });
  }

  // get joke by type
  async getByType(request: Request, response: Response) {
    const type = String(request.query.type);

    if (type == "undefined") {
      console.log("Error");
      response.status(404).json({ message: `Joke type not specified.` });
      return;
    }

    let page: number = 1;

    const requestPage = request.query.page;

    if (
      requestPage &&
      (typeof requestPage == "string" || typeof request == "number")
    ) {
      page = Number(requestPage);
    }

    const jokes = await new JokeService().getByCategory(type, page);
    response.status(200).json({ jokes: jokes, page: page, category: type });
    return;
  }

  //
  async populate(request: Request, response: Response) {
    const result: boolean = await new JokeService().populate();

    if (result) {
      response.status(200).json({ message: "Jokes Populated" });
      return;
    }

    response.status(400).json({ message: "Jokes could not be populated" });
  }
}
