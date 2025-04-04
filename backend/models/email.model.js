import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    aiGenerated: {
        type: Boolean,
        default: false
    },
    context: {
        type: String,
        default: ""
    }
}, { timestamps: true });
export const Email = mongoose.model("Email", emailSchema);