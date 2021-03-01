import mongoose from "mongoose";
import validator from 'validator';

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: [validator.isEmpty, 'Username is empty']
    },
    password: {
        type: String,
        required: true,
        validate: [validator.isEmpty, 'Password is empty']
    },
});

export default mongoose.model("authContent", authSchema);