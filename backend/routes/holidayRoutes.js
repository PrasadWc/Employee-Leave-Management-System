import express from "express";
import { addHoliday } from "../controllers/holidayController.js";
import { authenticateUser } from "../middleware/auth.js";
import { authRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/add", authenticateUser, authRoles("admin", "moderator"), addHoliday);

export default router;