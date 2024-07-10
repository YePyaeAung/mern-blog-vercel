import ArticleModel from "../models/ArticleModel.js";
import { errorJson, successJson } from "../utils/JsonResponse.js";

const ArticleLikeController = {
    likeArticle: async (req, res) => {
        try {
            const { article_id } = req.body;
            const article = await ArticleModel.findByIdAndUpdate(article_id, {
                $inc: { like_count: 1 },
            });
            res.json(successJson("Article Liked!", article));
        } catch (error) {
            res.json(errorJson("Something went wrong!", error));
        }
    },
};

export default ArticleLikeController;
