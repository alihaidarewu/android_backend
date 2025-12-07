"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const db = mysql2_1.default.createPool({
    host: "yamabiko.proxy.rlwy.net",
    user: "root",
    password: "dgWPvJfaTKHCvWiTSczogzuKnpNVTXCx",
    port: 42127,
    database: "railway"
});
exports.default = db;
