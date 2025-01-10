import express from "express";
import rootRouter from "./routes/index";

const app = express();

app.use('api/v1', rootRouter);