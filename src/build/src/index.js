"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
const app = (0, express_1.default)();
const port = process.env.APP_PORT;
if (!port) {
    throw new Error("No App Port set");
}
// Import Middleware
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const authentication_middleware_1 = __importDefault(require("./middleware/authentication.middleware"));
const db_1 = require("./config/db");
// Import Routes
const joke_routes_1 = __importDefault(require("./features/joke/joke.routes"));
// Jokes routes
app.use("/jokes", authentication_middleware_1.default, joke_routes_1.default);
// Error middleware
app.use(error_middleware_1.default);
// Launch app
(0, db_1.connectToDB)().then(() => {
    app.listen(port, () => {
        console.log(`⚡Sever is live @ http://localhost:${port}`);
    });
});
