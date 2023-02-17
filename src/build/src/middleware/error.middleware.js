"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, request, response, next) => {
    console.log(error.name);
    response.status(400).json({ errorType: error.name, message: error.message });
    next();
};
exports.default = errorMiddleware;
