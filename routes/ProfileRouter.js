import express from "express";
import ProfileController from "../controllers/ProfileController.js";
import CheckAuth from "../middleware/CheckAuth.js";

const router = express.Router();

// auth middleware
router.use(CheckAuth);

router.post("/change-password", ProfileController.changePassword);
router.post("/delete-account", ProfileController.removeAccount);

export default router;
