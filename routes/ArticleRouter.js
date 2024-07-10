import express from "express";
import {
    all,
    destroy,
    edit,
    getTagsAndLanguages,
    store,
    update,
} from "../controllers/ArticleController.js";
import CheckAuth from "../middleware/CheckAuth.js";

const router = express.Router();

// middleware
router.use(CheckAuth);

router.get("/tags-languages", getTagsAndLanguages);
router.post("/", store);
router.get("/", all);
router.get("/edit/:id", edit);
router.post("/update/:id", update);
router.delete("/:id", destroy);

export default router;
