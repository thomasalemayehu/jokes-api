import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
require("express-async-errors");

const app: Express = express();
const port: string | undefined = process.env.PORT;

if (!port) {
  throw new Error("No App Port set");
}

// Import Middleware
import ErrorMiddleware from "./middleware/error.middleware";
import authenticationMiddleware from "./middleware/authentication.middleware";
import { connectToDB } from "./config/db";
// Import Routes
import JokeRoutes from "./features/joke/joke.routes";
// Jokes routes
app.use("/jokes", authenticationMiddleware, JokeRoutes);

// Error middleware
app.use(ErrorMiddleware);

// Launch app

connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`⚡Sever is live @ ${port}`);
  });
});
