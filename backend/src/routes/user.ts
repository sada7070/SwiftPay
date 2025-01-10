import { Router } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const { userName, firstName, lastName, password} = req.body;

    // input validation using zod
    const requiredBody = z.object({
        userName: z.string().min(4).max(20),
        firstName: z.string().max(20),
        lastName: z.string().max(20),
        password: z.string().min(4).max(20)
    })

    const parseData = requiredBody.safeParse(req.body);

    if(!parseData.success) {
        res.status(411).json({
            message: "Incorrect format.",
            // to print the error
            error: parseData.error
        })
        return;
    }

    let errorThrown = false;

    try{
        // hashing password
        const hashedPassword = await bcrypt.hash(password, 5);

        // pushing data to DB
        await userModel.create({
            userName,
            firstName,
            lastName,
            password: hashedPassword
        })
        // if userName is already exist, it will throw an error
    } catch(e) {
        res.status(409).json({
            message: "Username already exist."
        })
        errorThrown = true;
    }

    if(!errorThrown) {
        res.status(200).json({
            message: "You are signed up."
        })
        return;
    }
});

userRouter.post("/signin", async (req, res) => {
    const { userName, password } = req.body;
   
    const userExist = await userModel.findOne({
        userName: userName
    })

    if(!userExist) {
        res.status(403).json({
            message: "Username does not exist."
        })
        return;
    }

    // comparing enterd password with original password
    const passwordMatched = await bcrypt.compare(password, (userExist!.password as string));

    if(passwordMatched){
        const token = jwt.sign({
            // creating token using unique value(ObjectId)
            id: userExist?._id
        }, process.env.JWT_SECRET!);

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Wrong password."
        })
    }
})

export default userRouter;