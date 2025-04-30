import express from "express";
import { createUser,login, getUser } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/auth.js";
import { authRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/add", createUser);
router.post("/login", login);
router.get("/getuser",authenticateUser, authRoles("admin", "user", "moderator"), getUser);
router.get("/getadmin",authenticateUser, authRoles("admin"), getUser);
router.get("/getmoderator",authenticateUser, authRoles("moderator","admin"), getUser);
//router.post("/changepassword", authenticateUser, changePassword);

export default router;