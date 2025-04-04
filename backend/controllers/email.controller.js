import mongoose from "mongoose";

import { Email } from "../models/email.model.js";


export const createEmail = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure it's extracted correctly
        const { to, subject, message, aiGenerated = false } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const email = await Email.create({
            to,
            subject,
            message,
            userId,
            aiGenerated
        });

        return res.status(201).json({ email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const deleteEmail = async (req, res) => {
    try {
        const emailId = req.params.id;
        if (!emailId) return res.status(400).json({ message: "Email ID is required" });

        const email = await Email.findByIdAndDelete(emailId);
        if (!email) return res.status(404).json({ message: "Email not found" });

        return res.status(200).json({ message: "Email deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// ✅ Fixed: Get all emails for the authenticated user
export const getAllEmailsByUser = async (req, res) => {
    try {
        const userId = req.user?.id; 
        const emails = await Email.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({ emails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// ✅ Fixed: Remove empty response, return real emails
export const getAllEmailById = async (req, res) => {
    try {
        const userId = req.user.id;
        const emails = await Email.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({ emails });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch emails." });
    }
};

export const generateAIEmail = async (req, res) => {
    try {
        const { subject } = req.body;

        if (!subject) {
            return res.status(400).json({ message: "Subject is required." });
        }

        // Dummy AI Response
        const generatedMessage = `Dear Recipient,\n\nThis is an AI-generated email regarding "${subject}". Let me know your thoughts.\n\nBest regards,\nYour AI Assistant`;

        return res.status(200).json({ generatedMessage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "AI email generation failed." });
    }
};