"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
import { userRoutes, orderRoutes, productRoutes } from './handler/handler.js';

const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
