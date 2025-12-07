"use strict";
// import all the packages and modules 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const database_config_1 = __importDefault(require("./config/database.config"));
// main code 
let app = (0, express_1.default)();
let myServer = http_1.default.createServer(app);
exports.myServer = myServer;
// connect with server 
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
// Request-Response Cycle 
app.get("/", function (req, res) {
    return res.status(200).json({
        status: 200,
        message: "Home Page",
        data: ""
    });
});
app.get("/data", function (req, res) {
    try {
        database_config_1.default.query("SELECT * FROM students", (err, results) => {
            if (err)
                return res.status(500).json({ error: err.message });
            res.json(results);
        });
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: "Find Error To Connect Database"
        });
    }
});
app.post("/data", function (req, res) {
    try {
        const { id, name, mark } = req.body;
        const sql = "INSERT INTO students (id, name, mark) VALUES (?, ?, ?)";
        database_config_1.default.query(sql, [id, name, mark], (err, result) => {
            if (err)
                return res.status(500).json({ error: err.message });
            res.json({ message: "Data inserted successfully" });
        });
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: "Find Error To post data on Database"
        });
    }
});
// Handle Server Error 
app.use(function (req, res, next) {
    return res.status(404).json({
        status: 404,
        message: "Page Not Found"
    });
});
app.use(function (err, req, res, next) {
    if (err instanceof Error) {
        return res.status(404).json({
            status: 404,
            message: "Page Not Found",
            error: err.message
        });
    }
    else {
        return res.status(404).json({
            status: 404,
            message: "Page Not Found",
            error: err
        });
    }
});
