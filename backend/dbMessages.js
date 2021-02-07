import mongoose from "mongoose";

const whatsappSchema = new mongoose.Schema({
    from: String,
    to: String,
    timestamp: String,
    message: String
});

export default mongoose.model("messageContent", whatsappSchema);