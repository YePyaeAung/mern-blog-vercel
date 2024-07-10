import express from "express";
import ArticleLikeController from "../controllers/ArticleLikeController.js";
import CheckAuth from "../middleware/CheckAuth.js";

const router = express.Router();

router.use(CheckAuth);

router.post("/like", ArticleLikeController.likeArticle);

export default router;
