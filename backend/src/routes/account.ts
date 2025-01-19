import { Router } from "express";
import { accountModel } from "../db";
import { authMiddleware } from "../middleware";
import mongoose from "mongoose";
import AuthenticatedRequest from "../middleware";

const accountRouter = Router();

// '/api/v1/account/...'
// An endpoint for user to get their balance.
accountRouter.get("/balance", authMiddleware, async (req: AuthenticatedRequest, res) => {
    const account = await accountModel.findOne({
        userId: req.userId
    });
    res.json({
        balance: account!.balance
    })
})

// An endpoint for user to transfer money to another account(using transactions in DB).
accountRouter.post("/transfer", authMiddleware, async(req: AuthenticatedRequest,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await accountModel.findOne({ userId: req.userId }).session(session);

    if(!account) {
        await session.abortTransaction();
        res.status(411).json({
            message: "Account not found."
        })
        return;
    }

    if (account.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance."
        });
        return;
    }

    const toAccount = await accountModel.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid account."
        });
        return;
    }

    // Perform the transfer.
    await accountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction.
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

export default accountRouter;