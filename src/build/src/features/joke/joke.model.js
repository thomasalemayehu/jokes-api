"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joke = void 0;
const mongoose_1 = require("mongoose");
const reactionSchema = new mongoose_1.Schema({
    reactions: { type: String, enum: ["FUNNY", "SAD", "NEUTRAL", "ANGRY"] },
    userId: { type: mongoose_1.Schema.Types.ObjectId },
});
const jokeSchema = new mongoose_1.Schema({
    type: {
        type: "String",
        required: true,
        enum: ["GENERAL", "UNKNOWN", "KNOCK-KNOCK", "PROGRAMMING", "DAD"],
    },
    setup: { type: "String", required: true },
    punchline: { type: "String", required: true },
    reactions: { type: [reactionSchema], default: [] },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
        },
    },
});
exports.Joke = (0, mongoose_1.model)("Joke", jokeSchema);
