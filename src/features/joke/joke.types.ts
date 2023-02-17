import { Schema } from "mongoose";

export type JokeTypes =
  | "GENERAL"
  | "UNKNOWN"
  | "KNOCK-KNOCK"
  | "PROGRAMMING"
  | "DAD";

export type ReactionType = "FUNNY" | "SAD" | "NEUTRAL" | "ANGRY";
export interface JokeReactions {
  reaction: ReactionType;
  userId: Schema.Types.ObjectId;
}
export interface IJoke {
  type: JokeTypes;
  setup: string;
  punchline: string;
  reactions: Array<JokeReactions>;
}
