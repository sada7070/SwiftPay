import mongoose, {model, Schema } from "mongoose";

mongoose.connect(process.env.DB_CONNECTION_STRING!);

const userSchema = new Schema({
    userName: {type: String, unique: true},
    firstName: String,
    lastName: String,
    password: String
})

export const userModel = model("User", userSchema);