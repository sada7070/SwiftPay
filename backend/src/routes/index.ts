import { Router } from "express";
import userRouter from "./user";

const router = Router();

// '/api/v1/user/...' requests goes to the 'userRouter'
router.use("/user", userRouter);

export default router;