import express from "express"; 
import { createEmail, deleteEmail, getAllEmailById,generateAIEmail } from "../controllers/email.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route("/create").post(isAuthenticated, createEmail);
router.route("/:id").delete(isAuthenticated, deleteEmail);
router.route("/getallemails").get(isAuthenticated, getAllEmailById);
router.route("/generate-ai").post(isAuthenticated, generateAIEmail);


export default router;
