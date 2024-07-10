import express from "express";
import CheckAuth from "../middleware/CheckAuth.js";
import CommentController from "../controllers/CommentController.js";

const router = express.Router();

router.use(CheckAuth);

router.post("/store", CommentController.storeComment);

export default router;
