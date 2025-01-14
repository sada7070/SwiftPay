import express from "express";
import cors from "cors";
require('dotenv').config();
const app = express();

//the route parser, middlewares etc.. should be declared before the routers is using them.
app.use(cors());
app.use(express.json());

import rootRouter from "./routes/index";

// '/api/v1/...' requests go to the 'rootRouter'
app.use("/api/v1", rootRouter);

app.listen(3000);