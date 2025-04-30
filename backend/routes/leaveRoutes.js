import express from "express";
import { addLeave } from "../controllers/leaveController.js";
import { authenticateUser } from "../middleware/auth.js";
import { authRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/add", authenticateUser, authRoles("user", "moderator"), addLeave);

export default router;