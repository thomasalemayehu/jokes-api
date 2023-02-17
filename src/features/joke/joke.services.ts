import { Joke } from "./joke.model";
import { IJoke } from "./joke.types";

import { jokes } from "../../../data/joke.data";
const JOKES_PER_PAGE: number = Number(process.env.JOKES_PER_PAGE) | 10;
export class JokeService {
  //
  async create(joke: IJoke): Promise<IJoke> {
    const newJoke = await Joke.create(joke);
    return newJoke;
  }

  async getAll(page: number = 1): Promise<Array<IJoke>> {
    return await Joke.find()
      .limit(JOKES_PER_PAGE)
      .skip(page * JOKES_PER_PAGE);
  }

  async getById(id: string): Promise<IJoke | null> {
    return await Joke.findById(id);
  }

  async getRandom(): Promise<IJoke | null> {
    const count = await Joke.count();

    const random = Math.floor(Math.random() * count);

    if (count > 0) {
      const joke = await Joke.findOne().skip(random);

      return joke;
    }

    return null;
  }

  async getByCategory(
    category: string,
    page: number = 1
  ): Promise<Array<IJoke> | null> {
    return await Joke.find({ type: category.toUpperCase() })
      .limit(JOKES_PER_PAGE)
      .skip(JOKES_PER_PAGE * page);
  }

  async populate(): Promise<boolean> {
    const count: number = await Joke.count();

    if (count != 0) {
      return false;
    }

    const unformattedJoke = jokes;

    let result: boolean = false;

    await Promise.all(
      unformattedJoke.map((jokes) => {
        return Joke.create({ ...jokes, reactions: [] });
      })
    )
      .then(() => {
        console.log("Data Populated");

        result = true;
      })
      .catch((e) => {
        console.log(e);

        result = false;
      });

    return result;
  }
}
