import mongoose from "mongoose";

const whatsappSchema = new mongoose.Schema({
    name: String,
    timestamp: String,
    message: String
});

export default mongoose.model("messageContent", whatsappSchema);