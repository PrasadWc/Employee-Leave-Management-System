import express from "express";
import { addLeave, getAllLeaves, deleteLeave, updateLeavebyMod, updateLeavebyAdmin } from "../controllers/leaveController.js";
import { authenticateUser } from "../middleware/auth.js";
import { authRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/add", authenticateUser, authRoles("user", "moderator"), addLeave);
router.get("/getallleavesforuser", authenticateUser, authRoles("user"), getAllLeaves);
router.delete("/delete/:id", authenticateUser, authRoles("user"), deleteLeave);
router.put("/updatebymod/:id", authenticateUser, authRoles("admin", "moderator"), updateLeavebyMod);
router.put("/updatebyadmin/:id", authenticateUser, authRoles("admin"), updateLeavebyAdmin);


export default router;