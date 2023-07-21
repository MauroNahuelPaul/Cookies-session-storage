import mongoose from "mongoose";
const usersCollection = 'user'

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_mail: { type: String, required: true },
    user_password: { type: String, required: true }
})

mongoose.set("strictQuery", false);
export const UserModel = mongoose.model(usersCollection, userSchema)