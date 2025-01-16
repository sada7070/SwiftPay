import { Router } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db";
import { authMiddleware } from "../middleware";

const userRouter = Router();

// '/api/v1/user/signup' requests comes here
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
        const user = await userModel.create({
            userName,
            firstName,
            lastName,
            password: hashedPassword
        })

        const userId = user.id;   
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

// '/api/v1/user/signin' requests comes here
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
            id: userExist!._id
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

// Route to update user information
userRouter.put("/", authMiddleware, async (req, res) => {
    const updateBody = z.object({
        password: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional()
    })

    const parseData = updateBody.safeParse(req.body);

    if(!parseData.success) {
        res.status(411).json({
            message: "Error while updating information."
        })
    }

    await userModel.updateOne(req.body, {
        // @ts-ignore
        id: req.userId
    })

    res.json({
        message: "Updated successfully."
    })
})

// Route to get users from the backend, filterable via firstName/lastName
userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await userModel.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

export default userRouter;