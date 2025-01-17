import { Router } from "express";
import userRouter from "./user";
import accountRouter from "./account";

const router = Router();

// '/api/v1/user/...' requests goes to the 'userRouter'
router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;