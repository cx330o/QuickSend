const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");

const middleware = require("./utils/middleware");

// 强力日志：启动时打印一次
console.log(">>> app.js loaded, mounting routers...");

const messageRouter = require("./routers/messages");   // 我们要的“数据库版”
const fileRouter    = require("./routers/files");
const downloadRouter= require("./routers/download");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

// 请求进入时先打一行
app.use((req, _res, next) => { console.log("IN >", req.method, req.path); next(); });

app.use("/api/messages", messageRouter);
app.use("/api/files", fileRouter);
app.use("/api/download", downloadRouter);

// 如果没有任何路由命中，这里会再打一行
app.use((req, _res, next) => { console.log("MISS>", req.method, req.path); next(); });

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
