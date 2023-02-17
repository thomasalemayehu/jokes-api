import { Schema, model } from "mongoose";

import { JokeTypes, IJoke, ReactionType, JokeReactions } from "./joke.types";

const reactionSchema = new Schema({
  reactions: { type: String, enum: ["FUNNY", "SAD", "NEUTRAL", "ANGRY"] },
  userId: { type: Schema.Types.ObjectId },
});

const jokeSchema = new Schema<IJoke>(
  {
    type: {
      type: "String",
      required: true,
      enum: ["GENERAL", "UNKNOWN", "KNOCK-KNOCK", "PROGRAMMING", "DAD"],
    },
    setup: { type: "String", required: true },
    punchline: { type: "String", required: true },
    reactions: { type: [reactionSchema], default: [] },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

export const Joke = model<IJoke>("Joke", jokeSchema);
