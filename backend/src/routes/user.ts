import { Router } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accountModel, userModel } from "../db";
import { authMiddleware } from "../middleware";
import AuthenticatedRequest from "../middleware";

const userRouter = Router();

// '/api/v1/user/signup' requests comes here
userRouter.post("/signup", async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    // Input validation using zod
    const requiredBody = z.object({
        email: z.string().email(),
        firstName: z.string().max(20),
        lastName: z.string().max(20),
        password: z.string().min(4).max(20),
    });

    const parseData = requiredBody.safeParse(req.body);

    if (!parseData.success) {
        res.status(411).json({
            message: "Incorrect format.",
            error: parseData.error,
        });
        return;
    }

    try {
        // Check if the email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            res.status(409).json({
                message: "Email already exists.",
            });
            return;
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 5);

        // Creating user in the database
        const user = await userModel.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });

        const userId = user._id;

        // Adding initial random balance
        await accountModel.create({
            userId,
            balance: 1 + Math.random() * 10000,
        });

        res.status(200).json({
            message: "You are signed up.",
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            message: "Internal server error.",
        });
    }
});


// '/api/v1/user/signin' requests comes here
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
   
    const userExist = await userModel.findOne({
        email: email
    })

    if(!userExist) {
        res.status(403).json({
            message: "email does not exist."
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
userRouter.put("/", authMiddleware, async (req: AuthenticatedRequest, res) => {
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
        return;
    }

    await userModel.updateOne({
        _id: req.userId
    }, req.body);

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
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

export default userRouter;