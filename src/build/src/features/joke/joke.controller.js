"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JokeController = void 0;
const joke_services_1 = require("./joke.services");
class JokeController {
    // Fetch all jokes - paginated
    getAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = 1;
            const requestPage = request.query.page;
            if (requestPage &&
                (typeof requestPage == "string" || typeof request == "number")) {
                page = Number(requestPage);
            }
            const allJokes = yield new joke_services_1.JokeService().getAll(page);
            response.status(200).json({ jokes: allJokes, page: page });
        });
    }
    // create new joke
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const joke = {
                type: "UNKNOWN",
                setup: "string",
                punchline: "string",
                reactions: [],
            };
            const newJoke = yield new joke_services_1.JokeService().create(joke);
            response.status(200).json({ joke: newJoke });
        });
    }
    // get joke by id
    getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const jokeId = request.params.id;
            if (!jokeId) {
                response
                    .status(404)
                    .json({ message: `Joke with id ${jokeId} not found.` });
                return;
            }
            const joke = yield new joke_services_1.JokeService().getById(jokeId);
            if (!joke) {
                response
                    .status(404)
                    .json({ message: `Joke with id ${jokeId} not found.` });
                return;
            }
            response.status(200).json({ joke: joke });
        });
    }
    // get random joke
    getRandom(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const joke = yield new joke_services_1.JokeService().getRandom();
            response.status(200).json({ joke: joke });
        });
    }
    // get joke by type
    getByType(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = String(request.query.type);
            if (type == "undefined") {
                console.log("Error");
                response.status(404).json({ message: `Joke type not specified.` });
                return;
            }
            let page = 1;
            const requestPage = request.query.page;
            if (requestPage &&
                (typeof requestPage == "string" || typeof request == "number")) {
                page = Number(requestPage);
            }
            const jokes = yield new joke_services_1.JokeService().getByCategory(type, page);
            response.status(200).json({ jokes: jokes, page: page, category: type });
            return;
        });
    }
    //
    populate(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield new joke_services_1.JokeService().populate();
            if (result) {
                response.status(200).json({ message: "Jokes Populated" });
                return;
            }
            response.status(400).json({ message: "Jokes could not be populated" });
        });
    }
}
exports.JokeController = JokeController;
