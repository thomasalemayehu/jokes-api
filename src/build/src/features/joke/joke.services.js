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
exports.JokeService = void 0;
const joke_model_1 = require("./joke.model");
const joke_data_1 = require("../../../data/joke.data");
const JOKES_PER_PAGE = Number(process.env.JOKES_PER_PAGE) | 10;
class JokeService {
    //
    create(joke) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJoke = yield joke_model_1.Joke.create(joke);
            return newJoke;
        });
    }
    getAll(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield joke_model_1.Joke.find()
                .limit(JOKES_PER_PAGE)
                .skip(page * JOKES_PER_PAGE);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield joke_model_1.Joke.findById(id);
        });
    }
    getRandom() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield joke_model_1.Joke.count();
            const random = Math.floor(Math.random() * count);
            if (count > 0) {
                const joke = yield joke_model_1.Joke.findOne().skip(random);
                return joke;
            }
            return null;
        });
    }
    getByCategory(category, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield joke_model_1.Joke.find({ type: category.toUpperCase() })
                .limit(JOKES_PER_PAGE)
                .skip(JOKES_PER_PAGE * page);
        });
    }
    populate() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield joke_model_1.Joke.count();
            if (count != 0) {
                return false;
            }
            const unformattedJoke = joke_data_1.jokes;
            let result = false;
            yield Promise.all(unformattedJoke.map((jokes) => {
                return joke_model_1.Joke.create(Object.assign(Object.assign({}, jokes), { reactions: [] }));
            }))
                .then(() => {
                console.log("Data Populated");
                result = true;
            })
                .catch((e) => {
                console.log(e);
                result = false;
            });
            return result;
        });
    }
}
exports.JokeService = JokeService;
