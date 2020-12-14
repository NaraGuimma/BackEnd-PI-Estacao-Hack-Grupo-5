"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors = require('cors');
const app = express_1.default();
const PORT = process.env.PORT || 3333;
app.use(cors());
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(PORT, () => console.log(`hosting @${PORT}`));
