"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationMiddleware = (request, _, next) => {
    console.log("Authenticating User");
    next();
};
exports.default = authenticationMiddleware;
