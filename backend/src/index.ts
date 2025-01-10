import express from "express";
import rootRouter from "./routes/route";

const app = express();

app.use('api/v1', rootRouter);