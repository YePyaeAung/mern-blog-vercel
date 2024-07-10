import express from "express";
import DataController from "../controllers/DataController.js";

const router = express.Router();

router.get("/get-tags-langs", DataController.getTagsLangs);
router.get("/get-latest-articles", DataController.getLatestArticles);
router.get(
    "/get-most-trending-articles",
    DataController.getMostTrendingArticles
);
router.get("/get-most-love-articles", DataController.getMostLoveArticles);
router.get("/get-all-articles", DataController.getAllArticles);
router.get("/article/:id", DataController.getArticleDetails);

export default router;
