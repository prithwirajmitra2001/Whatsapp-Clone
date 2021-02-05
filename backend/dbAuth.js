import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: String,
    password: String
});

export default mongoose.model("authContent", authSchema);